import { useEffect, useState } from "react";

const useFrameTime = () => {
  const [frameTime, setFrameTime] = useState<number>(0);

  useEffect(() => {
    let frameId: number = 0;
    const frame = (time: number) => {
      setFrameTime(time);
      frameId = requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, [setFrameTime]);

  return frameTime;
};

export default useFrameTime;
