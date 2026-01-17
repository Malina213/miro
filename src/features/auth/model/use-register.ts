import { publicRqClient } from "@/shared/api/instance";
import { useAppDispatch } from "@/shared/lib/hooks";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "@/shared/model/slices/sessionSlice";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registerMutation = publicRqClient.useMutation(
    "post",
    "/auth/register",
    {
      onSuccess(data) {
        dispatch(loginAction(data.accessToken))
        navigate(ROUTES.HOME);
      },
    },
  );

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
