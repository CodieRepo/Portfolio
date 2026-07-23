import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 80,
  strength = 0.35
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring config for the elastic magnetic effect
  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Distance from mouse position to center of element
      const distanceX = e.clientX - elementCenterX;
      const distanceY = e.clientY - elementCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < threshold) {
        // Calculate magnetic translation based on offset and strength
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        // Snap back to origin
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    if (element) {
      window.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [ref, x, y, threshold, strength]);

  return { x: springX, y: springY };
}
