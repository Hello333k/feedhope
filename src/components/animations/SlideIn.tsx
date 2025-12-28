import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type SlideDirection = "left" | "right";

interface SlideInProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: SlideDirection;
  once?: boolean;
}

const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  ({ children, delay = 0, duration = 0.6, direction = "left", className = "", once = true, ...rest }, ref) => {
    const xOffset = direction === "left" ? -60 : 60;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: xOffset }}
        whileInView={{ opacity: 1, x: 0 }}
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

SlideIn.displayName = "SlideIn";

export default SlideIn;
