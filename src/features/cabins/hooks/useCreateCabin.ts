import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";
import { TCabin } from "../CabinRow";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation<
    any,
    Error,
    TCabin
  >({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New Cabin successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
