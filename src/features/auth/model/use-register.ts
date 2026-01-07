import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });
  const register = (data: { email: string; password: string }) => {
    registerMutation.mutate({ body: data });
  };
  const errorMessage = registerMutation.isError
    ? registerMutation.error.message
    : null;
  return {
    register,
    errorMessage,
    isPending: registerMutation.isPending,
  };
};
