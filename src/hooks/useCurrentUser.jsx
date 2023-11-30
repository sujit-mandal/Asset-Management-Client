import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import GridLoader from "react-spinners/GridLoader";
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
  if (isLoading) {
    return <GridLoader color="#36d7b7" />;
  }
  return { data, refetch,isLoading };
};

export default useCurrentUser;
