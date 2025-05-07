
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    }
  }
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const fadeInStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const cardHoverAnimation = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" 
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const bounceAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

export const shimmerAnimation = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      repeat: Infinity,
      duration: 3
    }
  }
};

export const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const fadeInUpStaggered = (delay = 0) => ({
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      delay
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3
    }
  }
});
