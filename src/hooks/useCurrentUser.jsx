import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCurrentUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
    initialData: { data: [] },
    enabled: user ? true : false,
  });
  return { data, refetch,isLoading };
};

export default useCurrentUser;
