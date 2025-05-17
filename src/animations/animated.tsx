import { motion, useScroll, useTransform, Variants } from "framer-motion";
import React, { useRef, ReactNode } from "react";

// Create a reusable ScrollReveal component
interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Create a FadeIn component that replaces your current FadeIn
interface FadeInProps {
  children: ReactNode;
  transitionDuration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  transitionDuration = 700,
  direction = "up",
  delay = 0,
}) => {
  // Define different animations based on direction
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: 30 };
      case "right":
        return { opacity: 0, x: -30 };
      case "scale":
        return { opacity: 0, scale: 0.9 };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "scale":
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      animate={getAnimateProps()}
      transition={{
        duration: transitionDuration / 1000,
        delay: delay / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax section component for creating parallax scroll effects
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

// Staggered animation for lists and grids
interface StaggerContainerProps {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
}

const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delayChildren = 0.1,
  staggerChildren = 0.1,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// Item for use with StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
}

const StaggerItem: React.FC<StaggerItemProps> = ({ children }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

// Export all components
export { ScrollReveal, FadeIn, ParallaxSection, StaggerContainer, StaggerItem };
