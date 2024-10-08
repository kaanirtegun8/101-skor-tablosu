import { useMemo } from "react";

type DateFormat = "dd-mm-yyyy" | "mm-dd-yyyy" | "yyyy-mm-dd" | "fullDate";

const useFormattedDate = (
  dateString: string,
  format: DateFormat = "fullDate"
) => {
  const formatDate = useMemo(() => {
    const date = new Date(dateString);
    switch (format) {
      case "dd-mm-yyyy":
        return `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
      case "mm-dd-yyyy":
        return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
          .getDate()
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
      case "yyyy-mm-dd":
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      case "fullDate":
      default:
        return date.toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    }
  }, [dateString, format]);

  return formatDate;
};

export default useFormattedDate;
