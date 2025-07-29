import { useEffect, useState } from "react";

export function useThemeObserver() {
  // Initialize theme state from the current attribute
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-bs-theme") || "light"
  );

  useEffect(() => {
    const targetNode = document.documentElement;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-bs-theme"
        ) {
          const newTheme =
            document.documentElement.getAttribute("data-bs-theme") || "light";
          setTheme(newTheme);
        }
      }
    });

    observer.observe(targetNode, { attributes: true, attributeFilter: ["data-bs-theme"] });

    return () => observer.disconnect();
  }, []);

  return theme;
}
