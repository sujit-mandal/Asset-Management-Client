import AChart from "../../../Components/Adminhome/AChart";
import APendingReq from "../../../Components/Adminhome/APendingReq";
import ALimited from "../../../Components/Adminhome/ALimited";
import Astats from "../../../Components/Adminhome/Astats";
import { Container } from "@mui/material";
import useCurrentUser from "../../../hooks/useCurrentUser";
import Spinner from "../../../Components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  <Helmet>
  <title>Admin | Dashboard</title>
</Helmet>;
  const { isLoading } = useCurrentUser();
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="mx-auto">
      <Container maxWidth="xl">
        <Astats></Astats>
        <AChart></AChart>
        <APendingReq></APendingReq>
        <ALimited></ALimited>
      </Container>
    </div>
  );
};

export default AdminHome;
