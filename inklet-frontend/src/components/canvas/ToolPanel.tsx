import React from "react";
import { Button, Slider, Divider, Box, Typography, Paper } from "@mui/material";
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
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Tools */}
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Tools
          </Typography>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
            <Button
              variant={currentTool === "brush" ? "contained" : "outlined"}
              size="small"
              onClick={() => setCurrentTool("brush")}
              startIcon={<Brush size={16} />}
              sx={{ textTransform: "none", gap: 1 }}
            >
              Brush
            </Button>
            <Button
              variant={currentTool === "eraser" ? "contained" : "outlined"}
              size="small"
              onClick={() => setCurrentTool("eraser")}
              startIcon={<Eraser size={16} />}
              sx={{ textTransform: "none", gap: 1 }}
            >
              Eraser
            </Button>
          </Box>
        </Box>

        <Divider />

        {/* Brush Size */}
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Size: {brushSize}px
          </Typography>
          <Slider
            value={brushSize}
            onChange={(_, value) => setBrushSize(value as number)}
            min={1}
            max={50}
            step={1}
          />
        </Box>

        <Divider />

        {/* Colors */}
        {currentTool === "brush" && (
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Palette size={16} />
              Colors
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
              {BRUSH_COLORS.map((color) => (
                <Button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  sx={{
                    minWidth: 0,
                    minHeight: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    border: `2px solid ${
                      brushColor === color ? "#a8a29e" : "rgba(0,0,0,0.1)"
                    }`,
                    transition: "all 0.2s",
                    transform: brushColor === color ? "scale(1.1)" : "scale(1)",
                    backgroundColor: color,
                    "&:hover": {
                      backgroundColor: color,
                      opacity: 0.9,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Divider />

        {/* Actions */}
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={onClear}
            startIcon={<RotateCcw size={16} />}
            sx={{ textTransform: "none", gap: 1 }}
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
              gap: 1,
              background: "linear-gradient(to right, #10b981, #0d9488)",
              "&:hover": {
                background: "linear-gradient(to right, #059669, #0d9488)",
              },
            }}
          >
            Download Drawing
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ToolPanel;
