import { Button } from "@/shared/ui/kit/button"; // shadcn Button
import { toggleTheme } from "@/shared/model/slices/themeSlice";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function ThemeToggle() {
  const theme = useSelector((state: any) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      className="h-9 w-9 rounded-full"
    >
      {theme == "sun" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Переключить тему</span>
    </Button>
  );
}
