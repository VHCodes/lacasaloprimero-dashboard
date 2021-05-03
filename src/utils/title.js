import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `La casa lo primero - ${title}`;
    return () => {
      document.title = prevTitle;
    };
  });
}
