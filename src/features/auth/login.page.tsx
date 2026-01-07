import { Button } from "@/shared/ui/kit/button";
import { AuthLayout } from "./ui/auth-layout";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      form={<LoginForm />}
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
