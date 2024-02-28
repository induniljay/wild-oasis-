import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../../services/apiBookings";

import toast from "react-hot-toast";

export function useDeleteBooking() {
  //access queryClient
  const queryClient = useQueryClient();

  //delete db data using react-query
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      //to immediately fetch data after deleting we need to invalid current cache, there for we need to access query client.
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success("Booking successfully deleted");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
