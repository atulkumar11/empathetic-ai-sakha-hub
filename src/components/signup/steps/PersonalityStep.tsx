
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PersonalityType } from "@/types/user/base";
import { motion } from "framer-motion";
import { 
  Brain, 
  Lightbulb, 
  Hammer, 
  Eye, 
  Music, 
  Activity 
} from "lucide-react";

interface PersonalityStepProps {
  onPersonalitySelect: (personality: PersonalityType) => void;
}

interface PersonalityOption {
  type: PersonalityType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onPersonalitySelect }) => {
  const options: PersonalityOption[] = [
    {
      type: "analytical",
      title: "Analytical",
      description: "You enjoy solving problems with logic and reasoning",
      icon: <Brain className="h-6 w-6" />,
      color: "border-blue-200 hover:border-blue-500 text-blue-700"
    },
    {
      type: "creative",
      title: "Creative",
      description: "You learn best through creative expression and imagination",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "border-purple-200 hover:border-purple-500 text-purple-700"
    },
    {
      type: "practical",
      title: "Practical",
      description: "You prefer hands-on learning and practical applications",
      icon: <Hammer className="h-6 w-6" />,
      color: "border-green-200 hover:border-green-500 text-green-700"
    },
    {
      type: "visual",
      title: "Visual",
      description: "You learn best through images, diagrams and visual aids",
      icon: <Eye className="h-6 w-6" />,
      color: "border-amber-200 hover:border-amber-500 text-amber-700"
    },
    {
      type: "auditory",
      title: "Auditory",
      description: "You absorb information best through listening and discussion",
      icon: <Music className="h-6 w-6" />,
      color: "border-red-200 hover:border-red-500 text-red-700"
    },
    {
      type: "kinesthetic",
      title: "Kinesthetic",
      description: "You learn through movement, experiments and activity",
      icon: <Activity className="h-6 w-6" />,
      color: "border-indigo-200 hover:border-indigo-500 text-indigo-700"
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">What's Your Learning Style?</h3>
        <p className="text-sm text-gray-500 mb-4">
          Knowing how you learn best helps us personalize your study experience.
        </p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {options.map((option) => (
          <motion.div key={option.type} variants={item}>
            <button
              className={`w-full p-4 border rounded-lg text-left hover:shadow-md transition-all ${option.color} bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50`}
              onClick={() => onPersonalitySelect(option.type)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white border">
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-medium">{option.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PersonalityStep;
