
import { motion } from "framer-motion";
import { AlertTriangle, ScrollText, Brain, Zap, Target, Smile } from "lucide-react";

export interface FactorIconProps {
  name: string;
  icon: JSX.Element;
}

export const factorIcons: FactorIconProps[] = [
  { name: "Peer Anxiety", icon: <AlertTriangle size={16} className="text-orange-500" /> },
  { name: "Doubts/Digital Space", icon: <ScrollText size={16} className="text-sky-500" /> },
  { name: "Materials/Notes", icon: <Brain size={16} className="text-indigo-500" /> },
  { name: "Stress & Fear of Failure", icon: <Zap size={16} className="text-red-500" /> },
  { name: "Self Direction", icon: <Target size={16} className="text-green-500" /> },
  { name: "Parental Support", icon: <Smile size={16} className="text-amber-500" /> }
];

interface FactorIconsProps {
  containerVariants: any;
  factorVariants: any;
}

const FactorIcons = ({ containerVariants, factorVariants }: FactorIconsProps) => {
  return (
    <motion.div 
      className="mb-6 flex flex-wrap gap-2"
      variants={containerVariants}
    >
      {factorIcons.map((factor, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-violet-100 text-xs shadow-sm"
          variants={factorVariants}
          custom={index}
          whileHover="hover"
        >
          <div className="p-1 rounded-full bg-violet-50">{factor.icon}</div>
          {factor.name}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FactorIcons;
