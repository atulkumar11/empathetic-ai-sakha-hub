
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LightbulbIcon, BookOpenIcon, AlertTriangleIcon, TrophyIcon } from "lucide-react";

interface ConceptExplanationContentProps {
  conceptTitle: string;
}

const ConceptExplanationContent: React.FC<ConceptExplanationContentProps> = ({ conceptTitle }) => {
  const [activeTab, setActiveTab] = useState("basic");

  const explanationTypes = [
    { 
      id: "basic", 
      name: "Basic", 
      icon: <BookOpenIcon className="h-4 w-4 text-blue-500" />,
      color: "text-blue-700 bg-blue-50 border-blue-200"
    },
    { 
      id: "detailed", 
      name: "Detailed", 
      icon: <LightbulbIcon className="h-4 w-4 text-violet-500" />,
      color: "text-violet-700 bg-violet-50 border-violet-200" 
    },
    { 
      id: "simplified", 
      name: "Simplified", 
      icon: <BookOpenIcon className="h-4 w-4 text-emerald-500" />,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    { 
      id: "advanced", 
      name: "Advanced", 
      icon: <TrophyIcon className="h-4 w-4 text-amber-500" />,
      color: "text-amber-700 bg-amber-50 border-amber-200"
    }
  ];

  // Example explanations for Newton's Laws of Motion concept
  const explanations = {
    basic: {
      title: "Basic Explanation",
      content: (
        <div className="space-y-4">
          <p>Newton's Laws of Motion are three fundamental principles that explain how objects move and interact with forces. These laws form the foundation of classical mechanics.</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>First Law (Law of Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.</li>
            <li><strong>Second Law (F=ma):</strong> The force acting on an object is equal to the mass of the object times its acceleration.</li>
            <li><strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction.</li>
          </ul>
        </div>
      )
    },
    detailed: {
      title: "Detailed Explanation",
      content: (
        <div className="space-y-4">
          <h4 className="font-medium text-violet-700">First Law of Motion (Law of Inertia)</h4>
          <p>Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This law is often referred to as the law of inertia, where inertia is the resistance of any physical object to any change in its velocity.</p>
          <p>Examples include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A book resting on a table remains at rest until a force (like your hand) moves it.</li>
            <li>Passengers in a moving car tend to continue moving forward when the car suddenly stops.</li>
          </ul>
          
          <h4 className="font-medium text-violet-700 mt-4">Second Law of Motion (F=ma)</h4>
          <p>Newton's Second Law quantifies the relationship between force, mass, and acceleration. It states that the force acting on an object is equal to the mass of that object multiplied by its acceleration.</p>
          <p className="font-mono bg-gray-50 p-2 rounded">F = ma</p>
          <p>Where:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>F is the net force applied (measured in Newtons)</li>
            <li>m is the mass of the object (measured in kilograms)</li>
            <li>a is the acceleration (measured in meters per second squared)</li>
          </ul>
          
          <h4 className="font-medium text-violet-700 mt-4">Third Law of Motion (Action-Reaction)</h4>
          <p>Newton's Third Law states that for every action, there is an equal and opposite reaction. When one object exerts a force on another object, the second object exerts a force equal in magnitude but opposite in direction back on the first object.</p>
          <p>Examples include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A swimmer pushing water backward (action) propels themselves forward (reaction).</li>
            <li>A rocket expelling gas downward (action) propels the rocket upward (reaction).</li>
          </ul>
        </div>
      )
    },
    simplified: {
      title: "Simplified Explanation",
      content: (
        <div className="space-y-4">
          <p>Let's make Newton's Laws super simple:</p>
          
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <h4 className="font-medium text-emerald-700">First Law (The Lazy Object Law)</h4>
            <p className="text-emerald-600">Objects are lazy! They want to keep doing what they're already doing. If something is still, it wants to stay still. If something is moving, it wants to keep moving the same way. Only a push or pull can change this.</p>
          </div>
          
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <h4 className="font-medium text-emerald-700">Second Law (The Stronger Push Law)</h4>
            <p className="text-emerald-600">The harder you push something, the faster it speeds up. But heavy objects need a stronger push than light objects to speed up the same amount.</p>
          </div>
          
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <h4 className="font-medium text-emerald-700">Third Law (The Push-Back Law)</h4>
            <p className="text-emerald-600">Whenever you push on something, that thing pushes back on you with the same strength but in the opposite direction. Like when you push on a wall, the wall pushes back on you!</p>
          </div>
          
          <p className="italic text-gray-500">Think of it like this: When you're on a skateboard and you throw something forward, you move backward. That's the third law in action!</p>
        </div>
      )
    },
    advanced: {
      title: "Advanced Explanation",
      content: (
        <div className="space-y-4">
          <p className="font-medium">This explanation covers advanced applications and mathematical implications of Newton's Laws in classical mechanics.</p>
          
          <h4 className="font-semibold text-amber-700">Mathematical Formulations</h4>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-mono text-sm">
            <p>First Law: If ΣF = 0, then dv/dt = 0</p>
            <p className="mt-2">Second Law: ΣF = m·a = m·d²x/dt²</p>
            <p className="mt-2">Third Law: F₁₂ = -F₂₁</p>
          </div>
          
          <h4 className="font-semibold text-amber-700 mt-4">Advanced Applications</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Rotational Dynamics:</strong> Newton's laws extend to rotational motion where torque (τ) = moment of inertia (I) × angular acceleration (α).</li>
            <li><strong>Relativistic Mechanics:</strong> At speeds approaching the speed of light, Newton's laws must be modified using Einstein's special relativity.</li>
            <li><strong>Differential Equations:</strong> Newton's second law gives rise to second-order differential equations in mechanics that can be solved for position as a function of time.</li>
            <li><strong>Conservation Laws:</strong> Newton's laws lead to conservation of momentum and energy in closed systems.</li>
          </ul>
          
          <h4 className="font-semibold text-amber-700 mt-4">Limitations and Extensions</h4>
          <p>Newton's laws break down under certain conditions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>At quantum scales (requires quantum mechanics)</li>
            <li>At relativistic speeds (requires special relativity)</li>
            <li>In strong gravitational fields (requires general relativity)</li>
          </ul>
        </div>
      )
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <Tabs defaultValue="basic" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            {explanationTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-violet-50"
              >
                {type.icon}
                <span className="hidden sm:inline">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(explanations).map(([key, explanation]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className={`p-3 rounded-lg ${explanationTypes.find(t => t.id === key)?.color}`}>
                  <h3 className="font-medium">{explanation.title}</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  {explanation.content}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
};

export default ConceptExplanationContent;
