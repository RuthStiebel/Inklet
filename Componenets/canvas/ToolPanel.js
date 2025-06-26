import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
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
];

export default function ToolPanel({
  currentTool,
  setCurrentTool,
  brushSize,
  setBrushSize,
  brushColor,
  setBrushColor,
  onClear,
  onDownload,
}) {
  return (
    <div className="p-6 space-y-6">
      {/* Tools */}
      <div>
        <h3 className="text-sm font-semibold text-stone-800 mb-3">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={currentTool === "brush" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentTool("brush")}
            className="flex items-center gap-2"
          >
            <Brush className="w-4 h-4" />
            Brush
          </Button>
          <Button
            variant={currentTool === "eraser" ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentTool("eraser")}
            className="flex items-center gap-2"
          >
            <Eraser className="w-4 h-4" />
            Eraser
          </Button>
        </div>
      </div>

      <Separator />

      {/* Brush Size */}
      <div>
        <h3 className="text-sm font-semibold text-stone-800 mb-3">
          Size: {brushSize}px
        </h3>
        <Slider
          value={[brushSize]}
          onValueChange={(value) => setBrushSize(value[0])}
          max={50}
          min={1}
          step={1}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Colors */}
      {currentTool === "brush" && (
        <div>
          <h3 className="text-sm font-semibold text-stone-800 mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {BRUSH_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${
                  brushColor === color
                    ? "border-stone-400 scale-110"
                    : "border-stone-200 hover:border-stone-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="w-full flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Canvas
        </Button>

        <Button
          onClick={onDownload}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Drawing
        </Button>
      </div>
    </div>
  );
}
