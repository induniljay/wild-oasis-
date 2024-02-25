import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinAPI } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  //access queryClient
  const queryClient = useQueryClient();

  //delete db data using react-query
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      //to immediately fetch data after deleting we need to invalid current cache, there for we need to access query client.
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("Cabin successfully deleted");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
