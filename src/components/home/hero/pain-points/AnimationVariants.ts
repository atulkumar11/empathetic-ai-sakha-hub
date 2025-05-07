
// Animation variants for the PainPoints component

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

export const factorVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10 
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: { type: "spring", stiffness: 300 }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 8,
      delay: 0.1 * custom
    }
  }),
  hover: {
    x: 10,
    transition: { type: "spring", stiffness: 300 }
  }
};

export const headingVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 8 
    }
  }
};
