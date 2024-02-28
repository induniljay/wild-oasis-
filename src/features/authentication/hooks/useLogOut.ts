import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClinet = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      //remove all cache
      queryClinet.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
