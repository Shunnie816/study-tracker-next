import { useState, useEffect } from "react";

const BREAKPOINT = 768;

/**
 * 画面幅がBREAKPOINT以上かどうかを判定するカスタムフック
 * @returns isPC: boolean
 */
export function useDeviceSize(): { isPC: boolean } {
  const [isPC, setIsPC] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= BREAKPOINT);
    };
    handleResize(); // 初回実行
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isPC };
}
