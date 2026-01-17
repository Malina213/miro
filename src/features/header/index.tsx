import { ROUTES } from "@/shared/model/routes";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/kit/button";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { logout as logoutAction } from "@/shared/model/slices/sessionSlice";

export function AppHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = useAppSelector(state => state.session.session)
  if (!session) {
    return null;
  }
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={ROUTES.HOME} className="text-xl font-semibold">
          Miro Copy
        </Link>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Добро пожаловать, {session.email}!
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-destructive/10"
            >
              Выйти
            </Button>
          </div>
        ) : (
          <Button asChild variant="default" size="sm">
            <Link to={ROUTES.LOGIN}>Войти</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
