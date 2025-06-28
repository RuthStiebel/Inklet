import { useState, useRef } from "react";
import DrawingCanvas, {
  type DrawingCanvasRef,
} from "../components/canvas/DrawingCanvas";
import ToolPanel from "../components/canvas/ToolPanel";
import Layout from "../components/Layout";

export default function Canvas() {
  const [currentTool, setCurrentTool] = useState<string>("brush");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [brushColor, setBrushColor] = useState<string>("#2d3748");
  const canvasRef = useRef<DrawingCanvasRef>(null);

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (canvas) {
      const link = document.createElement("a");
      link.download = `drawing-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <Layout currentPageName="Canvas">
      <div className="h-screen bg-gradient-to-br from-stone-50 to-amber-50 overflow-hidden">
        <div className="h-full flex">
          {/* Left Panel - Tools */}
          <div className="w-80 bg-white/70 backdrop-blur-sm border-r border-stone-200/50 flex flex-col">
            <ToolPanel
              currentTool={currentTool}
              setCurrentTool={setCurrentTool}
              brushSize={brushSize}
              setBrushSize={setBrushSize}
              brushColor={brushColor}
              setBrushColor={setBrushColor}
              onClear={clearCanvas}
              onDownload={downloadDrawing}
            />
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-white rounded-3xl shadow-2xl shadow-stone-200/50 p-8 max-w-4xl w-full">
              <DrawingCanvas
                ref={canvasRef}
                currentTool={currentTool}
                brushSize={brushSize}
                brushColor={brushColor}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
