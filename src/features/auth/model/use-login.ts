import { publicRqClient } from "@/shared/api/instance";
import { useAppDispatch } from "@/shared/lib/hooks";
import { ROUTES } from "@/shared/model/routes";
import { login as loginAction } from "@/shared/model/slices/sessionSlice";
import { useNavigate } from "react-router-dom";


export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = publicRqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      dispatch(loginAction(data.accessToken))
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
