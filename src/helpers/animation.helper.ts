export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const projectCardVariants = {
  hidden: { 
    y: 50,
    opacity: 0,
    rotateY: -15,
    scale: 0.9,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export const imageContainerVariants = {
  rest: { 
    scale: 1,
    rotateZ: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    rotateZ: 0,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const imageVariants = {
  rest: { 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

export const overlayVariants = {
  rest: { 
    opacity: 0,
    y: 20,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const buttonVariants = {
  rest: { 
    scale: 0.9,
    opacity: 0,
    y: 20
  },
  hover: { 
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.1,
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: { 
      duration: 0.1,
    }
  }
};

export const techBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05 + 0.3,
      duration: 0.3,
    },
  }),
  hover: {
    y: -3,
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    color: "#007bff",
    transition: {
      duration: 0.2
    }
  }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateX: 10,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

 export  const modalContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};


