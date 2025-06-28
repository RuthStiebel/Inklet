import { useState, useRef } from "react";
import { Box } from "@mui/material";
import DrawingCanvas, {
  type DrawingCanvasRef,
} from "./components/canvas/DrawingCanvas";
import ToolPanel from "./components/canvas/ToolPanel";
import Layout from "./components/Layout";

export default function App() {
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
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 80px)", // adjust header height if needed
          bgcolor: "#232323", // dark background for the main area
        }}
      >
        {/* Tool Panel (left) */}
        <Box
          sx={{
            width: 340,
            bgcolor: "#fff",
            boxShadow: 3,
            borderRight: "1px solid #eee",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
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
        </Box>
        {/* Canvas Area (right, fills available space) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#232323",
          }}
        >
          <DrawingCanvas
            ref={canvasRef}
            currentTool={currentTool}
            brushSize={brushSize}
            brushColor={brushColor}
          />
        </Box>
      </Box>
    </Layout>
  );
}
