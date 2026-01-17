import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/shared/lib/hooks";

export function ProtectedRoute() {
  const session = useAppSelector(state => state.session.session)

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
