import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: FadeDirection;
  once?: boolean;
}

// simple fade offsets
const getOffset = (direction: FadeDirection) => {
  switch(direction) {
    case "up": return { y: 40, x: 0 };
    case "down": return { y: -40, x: 0 };
    case "left": return { x: 40, y: 0 };
    case "right": return { x: -40, y: 0 };
    default: return { x: 0, y: 0 };
  }
};

// Basic fade in component for scroll animations
const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, duration = 0.5, direction = "up", once = true, className = "", ...rest }, ref) => {
    const offset = getOffset(direction);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, ...offset }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = "FadeIn";

export default FadeIn;
