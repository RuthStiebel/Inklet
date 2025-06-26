import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const DrawingCanvas = forwardRef(
  ({ currentTool, brushSize, brushColor }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Set initial context properties
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setContext(ctx);
    }, []);

    useEffect(() => {
      if (context) {
        context.strokeStyle = currentTool === "eraser" ? "#ffffff" : brushColor;
        context.lineWidth =
          currentTool === "eraser" ? brushSize * 2 : brushSize;
        context.globalCompositeOperation =
          currentTool === "eraser" ? "destination-out" : "source-over";
      }
    }, [currentTool, brushSize, brushColor, context]);

    const startDrawing = (e) => {
      if (!context) return;

      setIsDrawing(true);

      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      context.beginPath();
      context.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawing || !context) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      context.lineTo(x, y);
      context.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        if (context) {
          context.fillStyle = "#ffffff";
          context.fillRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
        }
      },
      getCanvas: () => canvasRef.current,
    }));

    return (
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border-2 border-stone-200 rounded-xl shadow-inner bg-white cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        <p className="text-stone-500 text-sm mt-4 text-center">
          Start drawing on the canvas above
        </p>
      </div>
    );
  }
);

export default DrawingCanvas;
