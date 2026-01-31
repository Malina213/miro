import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router-dom";
import { LayoutGridIcon, StarIcon, ClockIcon } from "lucide-react";
import { cn } from "@/shared/lib/css";
import { useLocation } from "react-router-dom";

interface BoardsSidebarProps {
  className?: string;
}

const LINKS = [
  {
    path: ROUTES.BOARDS,
    label: "Все доски",
    icon: LayoutGridIcon,
  },
  {
    path: ROUTES.FAVORITE_BOARDS,
    label: "Избранное",
    icon: StarIcon,
  },
  {
    path: ROUTES.RECENT_BOARDS,
    label: "Недавние",
    icon: ClockIcon,
  },
] as const;

export function BoardsSidebar({ className }: BoardsSidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div className={cn("w-50 border-r p-4 space-y-4", className)}>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500 px-2">Навигация</div>
        {LINKS.map(({ path, label, icon: Icon }) => (
          <Button
            key={path}
            variant={"ghost"}
            className={cn(
              "w-full justify-start transition-all duration-200",
              isActive(path) && "bg-accent font-semibold",
            )}
            asChild
          >
            <Link to={path}>
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
