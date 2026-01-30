import { useCallback, useState } from "react";
import { ViewMode } from "../ui/view-mode-toggle";
import { useDebounceValue } from "@/shared/lib/hooks";

const VIEW_MODE_KEY = "viewMode";

export const useViewMode = () => {
  const getInitialViewMode = (): ViewMode => {
    const stored = localStorage.getItem(VIEW_MODE_KEY);
    if (stored === "list" || stored === "grid") {
      return stored;
    }
    return "list";
  };

  const [rawViewMode, setRawViewMode] = useState<ViewMode>(getInitialViewMode());
  const viewMode = useDebounceValue(rawViewMode, 300);

  const changeViewMode = useCallback((value: ViewMode) => {
    localStorage.setItem(VIEW_MODE_KEY, value);
    setRawViewMode(value);
  }, []);

  return {
    viewMode,
    changeViewMode,
  } as const;
};

