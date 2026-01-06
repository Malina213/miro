import { Button } from "@/shared/ui/kit/button";
import { AuthLayout } from "./auth-layout";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

function RegisterPage() {
  return (
    <AuthLayout
      form={<form></form>}
      title="Регистрация"
      description={"Введите ваш email и пароль для регистрации"}
      footerText={
        <>
          Есть аккаунт?
          <Button asChild variant="link">
            <Link to={ROUTES.LOGIN}>Давай проверим!</Link>
          </Button>
        </>
      }
    ></AuthLayout>
  );
}

export const Component = RegisterPage;
