import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { windowBoundariesAtom } from "states/window";

const useWindowBoundaries = (): null => {
  const setWindowBoundaries = useSetRecoilState(windowBoundariesAtom);

  useEffect(() => {
    if (!setWindowBoundaries) return;

    const handleResize = () => {
      const newBoundaries = {
        up: 0,
        down: window.innerHeight,
        left: 0,
        right: window.innerWidth,
      };

      setWindowBoundaries(newBoundaries);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowBoundaries]);

  return null;
};

export default useWindowBoundaries;
