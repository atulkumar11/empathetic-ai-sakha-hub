
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, HeartHandshake, Lightbulb } from 'lucide-react';

interface MoodAnalyzerProps {
  onBack: () => void;
}

const MoodAnalyzer: React.FC<MoodAnalyzerProps> = ({ onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doodle Board
        </Button>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">AI Powered</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-500" />
            Doodle Mood Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Color Analysis</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Blue (40%)</span>
                      <span>Calm, Peaceful</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Green (30%)</span>
                      <span>Growth, Harmony</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Purple (20%)</span>
                      <span>Creative, Imaginative</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Red (10%)</span>
                      <span>Energy, Passion</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Shape Analysis</h3>
                <div className="space-y-2 text-sm">
                  <p>• <span className="font-medium">Rounded shapes (65%)</span>: Indicate a friendly and approachable mindset</p>
                  <p>• <span className="font-medium">Flowing lines (25%)</span>: Suggest creativity and adaptability</p>
                  <p>• <span className="font-medium">Structured patterns (10%)</span>: Reflect analytical thinking</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Mood Assessment</h3>
              <div className="space-y-3">
                <Card className="bg-blue-50 border-blue-200 p-4">
                  <div className="flex items-start gap-3">
                    <HeartHandshake className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Overall Mood: Reflective & Calm</h4>
                      <p className="text-sm text-blue-700">
                        Your doodle indicates a balanced and contemplative mood. The combination of colors and shapes suggests you're in a thoughtful state with positive undertones.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Emotional Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Peaceful</Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Balanced</Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Creative</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Optimistic</Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Thoughtful</Badge>
                  </div>
                </div>
                
                <Card className="bg-amber-50 border-amber-200 p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Suggested Activities</h4>
                      <ul className="text-sm text-amber-700 space-y-1 list-disc ml-4">
                        <li>Try 10 minutes of guided meditation to enhance your calm state</li>
                        <li>Creative writing would complement your reflective mood</li>
                        <li>Gentle physical activity like walking would maintain your balance</li>
                        <li>This is a good time to tackle complex study materials</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground mb-2">
          Your mood analysis is private and only visible to you. 
          We use AI to analyze the visual elements of your doodle, not the content itself.
        </p>
      </div>
    </div>
  );
};

export default MoodAnalyzer;
