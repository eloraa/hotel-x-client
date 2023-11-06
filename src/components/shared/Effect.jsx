import { useEffect, useRef } from "react";
import { canvas } from "../utils/effect";

export const Effect = () => {
  const main = useRef(null);

  useEffect(() => {
    if (main.current) canvas(main.current);
    else return () => {};
  }, [main]);
  return <div className="absolute inset-0 -z-10" ref={main}></div>;
};
