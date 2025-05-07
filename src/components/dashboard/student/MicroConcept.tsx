
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ThumbsUp, 
  Book, 
  Video, 
  FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MicroConceptProps {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number; // in minutes
  content: string;
  resourceType: "Video" | "Text" | "PDF";
  resourceUrl: string;
  onComplete: (id: string) => void;
  onNeedHelp: (id: string) => void;
}

export default function MicroConcept({
  id,
  title,
  subject,
  chapter,
  difficulty,
  estimatedTime,
  content,
  resourceType,
  resourceUrl,
  onComplete,
  onNeedHelp
}: MicroConceptProps) {
  const [expanded, setExpanded] = useState(false);
  const [understood, setUnderstood] = useState(false);
  
  const handleMarkUnderstood = () => {
    setUnderstood(true);
    onComplete(id);
  };
  
  const handleNeedHelp = () => {
    onNeedHelp(id);
  };
  
  return (
    <Card className={cn(
      "shadow-md transition-all duration-300 overflow-hidden", 
      expanded ? "border-l-4" : "",
      understood ? "border-l-green-500" : expanded ? "border-l-sky-500" : ""
    )}>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium text-lg">{title}</div>
              <div className="text-muted-foreground text-sm">{subject} · {chapter}</div>
            </div>
            
            <div className="flex gap-2">
              <Badge variant={
                difficulty === "Easy" ? "outline" : 
                difficulty === "Medium" ? "secondary" : 
                "destructive"
              }>
                {difficulty}
              </Badge>
              <Badge variant="outline" className="flex gap-1 items-center">
                <BookOpen size={14} />
                <span>{estimatedTime} min</span>
              </Badge>
            </div>
          </div>
          
          {expanded && (
            <div className="mt-4 space-y-4 animate-fade-in">
              <div className="text-sm prose max-w-none">
                {content}
              </div>
              
              {resourceUrl && (
                <a 
                  href={resourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sky-600 hover:text-sky-800"
                >
                  {resourceType === "Video" && <Video size={16} />}
                  {resourceType === "Text" && <FileText size={16} />}
                  {resourceType === "PDF" && <Book size={16} />}
                  <span>Open {resourceType} Resource</span>
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className={cn(
        "p-3 bg-gray-50 flex justify-between", 
        understood && "bg-green-50"
      )}>
        {understood ? (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Check size={16} />
            <span>Concept Understood</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Expand"}
            </Button>
            
            {expanded && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleNeedHelp}
                >
                  <HelpCircle size={16} className="mr-1" />
                  Need Help
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={handleMarkUnderstood}
                >
                  <ThumbsUp size={16} className="mr-1" />
                  Got It!
                </Button>
              </>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
