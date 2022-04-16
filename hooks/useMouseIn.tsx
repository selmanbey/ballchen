import { useEffect, useState } from "react";

const useMouseIn = () => {
  const [mouseIn, setMouseIn] = useState(false);

  useEffect(() => {
    const handleFocus = (event: MouseEvent) => {
      if (
        event.clientY > 0 ||
        event.clientX > 0 ||
        event.clientX < window.innerWidth ||
        event.clientY < window.innerHeight
      ) {
        setMouseIn(true);
      }
    };
    const handleBlur = () => setMouseIn(false);

    document.documentElement.addEventListener("mouseenter", handleFocus);
    document.documentElement.addEventListener("mouseleave", handleBlur);
    return () => {
      document.documentElement.removeEventListener("mouseenter", handleFocus);
      document.documentElement.removeEventListener("mouseleave", handleBlur);
    };
  }, []);
  return mouseIn;
};

export default useMouseIn;
