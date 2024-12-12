import { useMemo } from "react";

const useStandardDeviation = (data: number[]) => {
  const standardDeviation = useMemo(() => {
    if (data.length === 0) return 0;

    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;

    return Math.sqrt(variance);
  }, [data]);

  return standardDeviation.toFixed(2);
};

export default useStandardDeviation;
