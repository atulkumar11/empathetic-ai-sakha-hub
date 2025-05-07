
import { motion } from "framer-motion";

interface SectionHeadingProps {
  children: React.ReactNode;
  headingVariants: any;
}

const SectionHeading = ({ children, headingVariants }: SectionHeadingProps) => {
  return (
    <motion.h3 
      className="font-semibold text-xl mb-4 text-violet-800 border-b border-violet-100 pb-2"
      variants={headingVariants}
    >
      {children}
    </motion.h3>
  );
};

export default SectionHeading;
