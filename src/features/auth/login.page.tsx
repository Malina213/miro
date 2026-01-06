import { Button } from "@/shared/ui/kit/button";
import { AuthLayout } from "./auth-layout";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

function LoginPage() {
  return (
    <AuthLayout
      form={<form></form>}
      title="Вход в систему"
      description={"Введите ваш email и пароль для входа"}
      footerText={
        <>
          Нет аккаунта?
          <Button asChild variant="link">
            <Link to={ROUTES.REGISTER}>Давай исправим!</Link>
          </Button>
        </>
      }
    ></AuthLayout>
  );
}

export const Component = LoginPage;
