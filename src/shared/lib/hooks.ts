import { useCallback, useEffect, useState } from "react";
import
 { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../model/store/store";
import { ViewMode } from "@/features/boards-list/ui/view-mode-toggle";

const VIEW_MODE_KEY = "viewMode";

export function useDebounceValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export const useViewMode = () => {
  console.log('Вызвался')
  const getInitialViewMode = (): ViewMode => {
    const stored = localStorage.getItem(VIEW_MODE_KEY);
    if (stored === "list" || stored === "grid") {
      return stored;
    }
    return "list";
  };

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);

  const changeViewMode = useCallback((value: ViewMode) => {
    localStorage.setItem(VIEW_MODE_KEY, value);
    setViewMode(value);
  }, []);

  return {
    viewMode,
    changeViewMode,
  } as const;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

