
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Trash, Save, Share, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoodleTab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [savedDoodles, setSavedDoodles] = useState<string[]>([]);
  const { toast } = useToast();

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        setContext(ctx);
      }
      
      // Set canvas size to fit its container
      const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth - 20; // padding
          canvas.height = 300;
          
          // Restore saved drawing if context changes
          if (ctx) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize;
          }
        }
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);
  
  // Update context when color or brush size changes
  useEffect(() => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = brushSize;
    }
  }, [color, brushSize, context]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (context) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.type === 'mousedown' 
          ? (e as React.MouseEvent).clientX - rect.left
          : (e as React.TouchEvent).touches[0].clientX - rect.left;
        const y = e.type === 'mousedown'
          ? (e as React.MouseEvent).clientY - rect.top
          : (e as React.TouchEvent).touches[0].clientY - rect.top;
        
        context.beginPath();
        context.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.type === 'mousemove'
        ? (e as React.MouseEvent).clientX - rect.left
        : (e as React.TouchEvent).touches[0].clientX - rect.left;
      const y = e.type === 'mousemove'
        ? (e as React.MouseEvent).clientY - rect.top
        : (e as React.TouchEvent).touches[0].clientY - rect.top;
      
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (context) {
      context.closePath();
    }
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveDoodle = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setSavedDoodles(prev => [...prev, dataUrl]);
      
      // Store in localStorage (with size limit)
      try {
        localStorage.setItem('savedDoodles', JSON.stringify([...savedDoodles, dataUrl].slice(-10)));
      } catch (e) {
        console.error("Error saving doodle to localStorage:", e);
      }
      
      toast({
        title: "Doodle Saved",
        description: "Your artwork has been saved successfully"
      });
    }
  };

  const shareDoodle = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      
      // In a real app, this would connect to a sharing backend
      // For now, we'll simulate analysis and response
      
      toast({
        title: "Doodle Shared",
        description: "Your doodle has been shared and will be analyzed"
      });
      
      // Simulate AI analysis response
      setTimeout(() => {
        toast({
          title: "Doodle Analysis",
          description: "Your drawing shows creativity and positive expression! Keep it up!",
          variant: "default"
        });
      }, 2000);
    }
  };

  const downloadDoodle = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `sakha-doodle-${new Date().toISOString().slice(0,10)}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <input 
            type="color" 
            value={color} 
            onChange={e => setColor(e.target.value)} 
            className="w-8 h-8 border-0 p-0 rounded-full overflow-hidden cursor-pointer"
          />
          <select 
            value={brushSize} 
            onChange={e => setBrushSize(Number(e.target.value))}
            className="p-1 rounded border text-sm"
          >
            <option value="2">Small</option>
            <option value="5">Medium</option>
            <option value="10">Large</option>
            <option value="20">Extra Large</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <Button variant="destructive" size="sm" onClick={clearCanvas}>
            <Trash size={14} className="mr-1" /> Clear
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onTouchStart={startDrawing}
          onMouseMove={draw}
          onTouchMove={draw}
          onMouseUp={stopDrawing}
          onTouchEnd={stopDrawing}
          onMouseLeave={stopDrawing}
          className="touch-none w-full h-[300px] border border-gray-200 rounded-md"
        ></canvas>
      </div>
      
      <div className="flex justify-center space-x-2">
        <Button variant="outline" size="sm" onClick={saveDoodle}>
          <Save size={14} className="mr-1" /> Save
        </Button>
        <Button variant="outline" size="sm" onClick={shareDoodle}>
          <Share size={14} className="mr-1" /> Post & Analyze
        </Button>
        <Button variant="outline" size="sm" onClick={downloadDoodle}>
          <Download size={14} className="mr-1" /> Download
        </Button>
      </div>

      {savedDoodles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Your Saved Doodles</h4>
          <div className="grid grid-cols-3 gap-2">
            {savedDoodles.map((doodle, index) => (
              <img 
                key={index} 
                src={doodle} 
                alt={`Saved doodle ${index + 1}`} 
                className="border rounded-md h-20 w-full object-contain bg-white"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoodleTab;
