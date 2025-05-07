
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp } from "lucide-react";

const PersonalizationTab = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Learning Style Detection</span>
              <Button variant="outline" size="sm">Configure</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Learning Style Distribution</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Visual:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">42%</span>
                      <span className="text-xs text-green-600">+5%</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Auditory:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">28%</span>
                      <span className="text-xs text-red-600">-2%</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Reading:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">15%</span>
                      <span className="text-xs text-green-600">+1%</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Kinesthetic:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">15%</span>
                      <span className="text-xs text-red-600">-4%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">View Clusters</Button>
                <Button variant="outline" size="sm">Adjust Questions</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Adaptive Difficulty Engine</span>
              <Button variant="outline" size="sm">Tune</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium">Current Model</h3>
                  <p className="text-sm text-gray-600 mt-1">GPT-4 + Reinforcement</p>
                  <div className="mt-2 text-sm">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium">Performance</h3>
                  <p className="text-2xl font-bold text-primary mt-1">92%</p>
                  <p className="text-sm text-gray-600">Target accuracy</p>
                </div>
              </div>
              <Button size="sm">Adjust Thresholds</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Study Plan Generator</span>
              <Button variant="outline" size="sm">View Plans</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Plan Generation Stats</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Plans Generated:</span>
                    <p className="font-bold">845</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Adherence:</span>
                    <p className="font-bold">74%</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Modifications:</span>
                    <p className="font-bold">186</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <span className="text-sm text-gray-600">Avg Rating:</span>
                    <p className="font-bold">4.2/5</p>
                  </div>
                </div>
              </div>
              <Button size="sm">Adjust Plan Templates</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Feel-Good Corner</span>
              <Button variant="outline" size="sm">Manage</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Content Engagement</h3>
                  <span className="text-sm text-green-600">+12% this week</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">285</div>
                    <div className="text-xs text-gray-600">Memes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">142</div>
                    <div className="text-xs text-gray-600">Puzzles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">364</div>
                    <div className="text-xs text-gray-600">Jokes</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">Upload Content</Button>
                <Button variant="outline" size="sm">Review Flagged</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>AI Model Configuration</span>
            <Button variant="outline" size="sm">Advanced Settings</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">AI Module</th>
                  <th className="text-left py-3 px-4 font-medium">Current Model</th>
                  <th className="text-left py-3 px-4 font-medium">Accuracy</th>
                  <th className="text-left py-3 px-4 font-medium">Latency</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Learning Style Detector</td>
                  <td className="py-3 px-4">GPT-4 + Custom Classifier</td>
                  <td className="py-3 px-4">92%</td>
                  <td className="py-3 px-4">1.2s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Configure</Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Study Planner</td>
                  <td className="py-3 px-4">GPT-4 + Scheduling Algorithm</td>
                  <td className="py-3 px-4">86%</td>
                  <td className="py-3 px-4">2.4s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Configure</Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Mood Analysis</td>
                  <td className="py-3 px-4">Sentiment Model v2</td>
                  <td className="py-3 px-4">78%</td>
                  <td className="py-3 px-4">0.8s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Needs Tuning</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Tune Model</Button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Doubt Resolver</td>
                  <td className="py-3 px-4">GPT-4 + KB Integration</td>
                  <td className="py-3 px-4">94%</td>
                  <td className="py-3 px-4">1.8s</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Configure</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationTab;
