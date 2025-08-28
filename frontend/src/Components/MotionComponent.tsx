import { AnimatePresence, motion } from "framer-motion";

const MotionComponent = ({
  children,
  initial,
  animate,
  exit,
  transition,
  className,
}: {
  children: React.ReactNode;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  className?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={initial || { width: 0, opacity: 0 }}
        animate={animate || { width: "100%", opacity: 1 }}
        exit={exit || { width: 0, opacity: 0 }}
        transition={transition || { duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionComponent;
