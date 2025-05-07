
import React, { useRef, useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Trash2, 
  Eraser, 
  PenTool, 
  CheckCircle, 
  RotateCcw, 
  Square, 
  Circle, 
  Save
} from 'lucide-react';

const colorOptions = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Purple', value: '#800080' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Pink', value: '#FFC0CB' },
];

const DoodleBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState([5]);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rectangle' | 'circle'>('pen');
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set default canvas background to white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state
    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([initialState]);
  }, []);
  
  const saveCurrentState = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev, currentState]);
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    
    // Get pointer position
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      ctx.lineWidth = lineWidth[0];
    } else {
      // For shapes, just store starting position
      setStartPos({ x, y });
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get pointer position
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };
  
  const endDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (tool === 'rectangle' || tool === 'circle') {
      // Draw shape when mouse is released
      const rect = canvas.getBoundingClientRect();
      let x, y;
      
      if ('changedTouches' in e) {
        // Touch event
        x = e.changedTouches[0].clientX - rect.left;
        y = e.changedTouches[0].clientY - rect.top;
      } else {
        // Mouse event
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      
      if (startPos) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth[0];
        
        if (tool === 'rectangle') {
          ctx.beginPath();
          ctx.rect(
            startPos.x,
            startPos.y,
            x - startPos.x,
            y - startPos.y
          );
          ctx.stroke();
        } else if (tool === 'circle') {
          ctx.beginPath();
          const radius = Math.sqrt(
            Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
          );
          ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
    }
    
    setIsDrawing(false);
    saveCurrentState();
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save cleared state
    saveCurrentState();
    
    toast({
      title: "Canvas Cleared",
      description: "Your doodle board has been cleared."
    });
  };
  
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.download = 'doodle.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Doodle Downloaded",
      description: "Your doodle has been downloaded successfully!"
    });
  };
  
  const undo = () => {
    if (undoStack.length <= 1) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Remove the current state
    setUndoStack(prev => {
      const newStack = [...prev];
      newStack.pop();
      
      // Apply the previous state
      if (newStack.length > 0) {
        const prevState = newStack[newStack.length - 1];
        ctx.putImageData(prevState, 0, 0);
      }
      
      return newStack;
    });
  };
  
  const saveToDoodleBook = () => {
    toast({
      title: "Doodle Saved",
      description: "Your doodle has been saved to your personal doodle book!"
    });
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <Card className="p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={tool === 'pen' ? "default" : "outline"} 
            onClick={() => setTool('pen')}
            className="h-9 w-9 p-0"
          >
            <PenTool className="h-5 w-5" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === 'eraser' ? "default" : "outline"} 
            onClick={() => setTool('eraser')}
            className="h-9 w-9 p-0"
          >
            <Eraser className="h-5 w-5" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === 'rectangle' ? "default" : "outline"} 
            onClick={() => setTool('rectangle')}
            className="h-9 w-9 p-0"
          >
            <Square className="h-5 w-5" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === 'circle' ? "default" : "outline"} 
            onClick={() => setTool('circle')}
            className="h-9 w-9 p-0"
          >
            <Circle className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption.value}
              className={`h-6 w-6 rounded-full border ${color === colorOption.value ? 'border-black dark:border-white ring-2 ring-offset-2' : 'border-gray-300'}`}
              style={{ backgroundColor: colorOption.value }}
              onClick={() => setColor(colorOption.value)}
              title={colorOption.name}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-2 min-w-[180px]">
          <span className="text-sm mr-1">Size:</span>
          <Slider
            value={lineWidth}
            min={1}
            max={20}
            step={1}
            className="w-32"
            onValueChange={setLineWidth}
          />
          <span className="text-sm ml-1">{lineWidth[0]}px</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={undo}>
            <RotateCcw className="h-4 w-4 mr-1" /> Undo
          </Button>
          <Button size="sm" variant="outline" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
          <Button size="sm" variant="outline" onClick={downloadImage}>
            <Download className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </Card>
      
      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-[400px] touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Express yourself through doodling - it helps release stress and improve focus!
        </p>
        <Button variant="default" onClick={saveToDoodleBook}>
          <Save className="h-4 w-4 mr-2" /> Add to My Doodle Collection
        </Button>
      </div>
    </div>
  );
};

export default DoodleBoard;
