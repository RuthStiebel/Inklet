import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  type MouseEvent,
  type TouchEvent,
} from "react";

interface DrawingCanvasProps {
  currentTool: string;
  brushSize: number;
  brushColor: string;
}

export interface DrawingCanvasRef {
  clearCanvas: () => void;
  getCanvas: () => HTMLCanvasElement | null;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  ({ currentTool, brushSize, brushColor }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
      null
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

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

    const getCoordinates = (
      e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
    ) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startDrawing = (
      e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
    ) => {
      if (!context) return;
      setIsDrawing(true);

      const { x, y } = getCoordinates(e);
      context.beginPath();
      context.moveTo(x, y);
    };

    const draw = (
      e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
    ) => {
      if (!isDrawing || !context) return;

      const { x, y } = getCoordinates(e);
      context.lineTo(x, y);
      context.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        if (context && canvasRef.current) {
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
