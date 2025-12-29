import { X, PenTool, Highlighter, Type, Square, Circle, ArrowRight, Minus } from 'lucide-react';
import { useState } from 'react';

interface AnnotationPanelProps {
  onClose: () => void;
}

export function AnnotationPanel({ onClose }: AnnotationPanelProps) {
  const [selectedTool, setSelectedTool] = useState<string>('pen');
  const [selectedColor, setSelectedColor] = useState('#EF4444');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [opacity, setOpacity] = useState(100);

  const colors = [
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Black', value: '#000000' },
  ];

  const tools = [
    { id: 'pen', icon: PenTool, name: 'Pen' },
    { id: 'highlighter', icon: Highlighter, name: 'Highlighter' },
    { id: 'text', icon: Type, name: 'Text' },
    { id: 'rectangle', icon: Square, name: 'Rectangle' },
    { id: 'circle', icon: Circle, name: 'Circle' },
    { id: 'arrow', icon: ArrowRight, name: 'Arrow' },
    { id: 'line', icon: Minus, name: 'Line' },
  ];

  return (
    <div className="w-72 bg-white border-l border-neutral-200 flex flex-col">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-neutral-900">Annotation Tools</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Tools */}
        <div>
          <label className="block mb-2 text-neutral-700 text-sm">Tool</label>
          <div className="grid grid-cols-2 gap-1.5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded border text-sm transition-all ${
                    selectedTool === tool.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block mb-2 text-neutral-700 text-sm">Color</label>
          <div className="grid grid-cols-6 gap-1.5">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-9 h-9 rounded border-2 transition-all ${
                  selectedColor === color.value
                    ? 'border-neutral-800 scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="mt-2">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-9 rounded border border-neutral-300 cursor-pointer"
            />
          </div>
        </div>

        {/* Stroke Width */}
        <div>
          <label className="block mb-2 text-neutral-700 text-sm">
            Stroke Width: {strokeWidth}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between mt-1 text-neutral-500 text-xs">
            <span>1px</span>
            <span>20px</span>
          </div>
        </div>

        {/* Opacity */}
        <div>
          <label className="block mb-2 text-neutral-700 text-sm">
            Opacity: {opacity}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between mt-1 text-neutral-500 text-xs">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block mb-2 text-neutral-700 text-sm">Preview</label>
          <div className="border border-neutral-300 rounded p-3 bg-neutral-50">
            <svg width="100%" height="60" className="bg-white rounded">
              <line
                x1="20"
                y1="30"
                x2="220"
                y2="30"
                stroke={selectedColor}
                strokeWidth={strokeWidth}
                opacity={opacity / 100}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
            Apply Tool
          </button>
          <button className="w-full px-4 py-2 border border-neutral-300 text-sm rounded text-neutral-700 hover:bg-neutral-50 transition-colors">
            Clear Annotations
          </button>
        </div>
      </div>
    </div>
  );
}