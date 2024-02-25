import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdateSetting, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success(" Setting successfully updated");
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdateSetting, updateSetting };
}
