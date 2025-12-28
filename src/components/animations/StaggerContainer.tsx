import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants"> {
  children: ReactNode;
  staggerDelay?: number;
  once?: boolean;
}

// Container for staggered animations
const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ children, className = "", staggerDelay = 0.1, once = true, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

StaggerContainer.displayName = "StaggerContainer";

export default StaggerContainer;
