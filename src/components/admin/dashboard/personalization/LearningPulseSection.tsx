
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, FileText, BarChart, Clock, 
  Zap, AlertTriangle, CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LearningPulseSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Learning Pulse",
      description: "Opening configuration interface for Learning Pulse Generator",
      variant: "default"
    });
  };
  
  const handleViewLogs = () => {
    toast({
      title: "Learning Pulse Logs",
      description: "Opening logs for Learning Pulse Generator",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-green-500" size={20} />
            <span>Learning Pulse Generator</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Quick Summary</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md flex flex-col items-center">
                <Clock size={20} className="text-green-600 mb-1" />
                <span className="text-sm font-medium">30-Second</span>
                <span className="text-xs text-gray-600">Summary Generation</span>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md flex flex-col items-center">
                <Zap size={20} className="text-blue-600 mb-1" />
                <span className="text-sm font-medium">Real-time</span>
                <span className="text-xs text-gray-600">Assessment</span>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md flex flex-col items-center">
                <BarChart size={20} className="text-purple-600 mb-1" />
                <span className="text-sm font-medium">Mood Scoring</span>
                <span className="text-xs text-gray-600">With LLM Integration</span>
              </div>
              <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-md flex flex-col items-center">
                <FileText size={20} className="text-pink-600 mb-1" />
                <span className="text-sm font-medium">Readiness</span>
                <span className="text-xs text-gray-600">Assessment</span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Recent Pulse Reports</h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Today
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Riya Patel</p>
                    <p className="text-xs text-gray-600">Ready for intensive study</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">11:23 AM</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">Arjun Singh</p>
                    <p className="text-xs text-gray-600">Minor fatigue detected</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">10:47 AM</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Neha Kapoor</p>
                    <p className="text-xs text-gray-600">High anxiety detected</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">09:15 AM</Badge>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-3" onClick={handleViewLogs}>
              View All Reports
            </Button>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Model Performance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-lg font-bold">87%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-lg font-bold">0.8s</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Daily Assessments</p>
                <p className="text-lg font-bold">1,245</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningPulseSection;
