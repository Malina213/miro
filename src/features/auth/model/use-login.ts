import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });
  const login = (data: { email: string; password: string }) => {
    loginMutation.mutate({ body: data });
  };
  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : null;
  return {
    login,
    errorMessage,
    isPending: loginMutation.isPending,
  };
};
