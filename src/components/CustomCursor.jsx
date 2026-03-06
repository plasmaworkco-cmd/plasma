import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState("default");
  const [activeColor, setActiveColor] = useState("var(--color-emerald)");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Listener for custom hover events
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorType(target.getAttribute('data-cursor'));
        const color = target.getAttribute('data-accent');
        if (color) setActiveColor(color);
      } else {
        setCursorType("default");
        setActiveColor("var(--color-emerald)");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        border: `1.5px solid ${activeColor}`,
        backgroundColor: cursorType === "default" ? activeColor : "transparent",
      }}
      animate={{
        width: cursorType === "default" ? 16 : 90,
        height: cursorType === "default" ? 16 : 90,
      }}
    >
      {cursorType !== "default" && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-widest pointer-events-none"
          style={{ color: activeColor }}
        >
          {cursorType}
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
