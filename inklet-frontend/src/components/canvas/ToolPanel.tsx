import React from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { Brush, Eraser, RotateCcw, Download, Palette } from "lucide-react";

const BRUSH_COLORS = [
  "#1f2937",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#2563eb",
  "#7c3aed",
  "#c2410c",
] as const;

interface ToolPanelProps {
  currentTool: string;
  setCurrentTool: (tool: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  brushColor: string;
  setBrushColor: (color: string) => void;
  onClear: () => void;
  onDownload: () => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({
  currentTool,
  setCurrentTool,
  brushSize,
  setBrushSize,
  brushColor,
  setBrushColor,
  onClear,
  onDownload,
}) => {
  return (
    <div
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Tools */}
      <div>
        <h3
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: "0.75rem",
          }}
        >
          Tools
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
          }}
        >
          <Button
            variant={currentTool === "brush" ? "contained" : "outlined"}
            size="small"
            onClick={() => setCurrentTool("brush")}
            startIcon={<Brush size={16} />}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Brush
          </Button>
          <Button
            variant={currentTool === "eraser" ? "contained" : "outlined"}
            size="small"
            onClick={() => setCurrentTool("eraser")}
            startIcon={<Eraser size={16} />}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Eraser
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 1 }} />

      {/* Brush Size */}
      <div>
        <h3
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: "0.75rem",
          }}
        >
          Size: {brushSize}px
        </h3>
        <Slider
          value={brushSize}
          onChange={(_, value) => setBrushSize(value as number)}
          min={1}
          max={50}
          step={1}
          sx={{ width: "100%" }}
        />
      </div>

      <Divider sx={{ my: 1 }} />

      {/* Colors */}
      {currentTool === "brush" && (
        <div>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#1f2937",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Palette size={16} />
            Colors
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.5rem",
            }}
          >
            {BRUSH_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  border: `2px solid ${
                    brushColor === color ? "#a8a29e" : "#e5e7eb"
                  }`,
                  transition: "all 0.2s",
                  transform: brushColor === color ? "scale(1.1)" : "scale(1)",
                  backgroundColor: color,
                  cursor: "pointer",
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      <Divider sx={{ my: 1 }} />

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={onClear}
          startIcon={<RotateCcw size={16} />}
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          Clear Canvas
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={onDownload}
          startIcon={<Download size={16} />}
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            background: "linear-gradient(to right, #10b981, #0d9488)",
            "&:hover": {
              background: "linear-gradient(to right, #059669, #0d9488)",
            },
          }}
        >
          Download Drawing
        </Button>
      </div>
    </div>
  );
};

export default ToolPanel;
