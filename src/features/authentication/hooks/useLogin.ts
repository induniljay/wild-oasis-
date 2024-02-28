import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  // ### manually add use into the user cache
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      // ### manually add use into the user cache
      queryClient.setQueryData(["user"], user.user);

      navigate("/dashboard", { replace: true });
      toast.success("Login successful");
      console.log(user);
    },

    onError: (err) => {
      console.log("Error =>", err);
      toast.error("Provided email or password is incorrect.");
    },
  });

  return { login, isLoading };
}
