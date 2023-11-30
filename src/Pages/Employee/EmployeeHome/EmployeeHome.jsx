import { Container } from "@mui/material";
import ECustomReq from "../../../Components/Employehome/ECustomReq";
import EMonthlyReq from "../../../Components/Employehome/EMonthlyReq";
import EPendingReq from "../../../Components/Employehome/EPendingReq";
import useCurrentUser from "../../../hooks/useCurrentUser";
import Spinner from "../../../Components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";

const EmployeeHome = () => {

  <Helmet>
    <title>Employee | Dashboard</title>
  </Helmet>;
  const { isLoading } = useCurrentUser();
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <Container maxWidth="xl">
      <div className="mx-auto">
        <ECustomReq></ECustomReq>
        <EPendingReq></EPendingReq>
        <EMonthlyReq></EMonthlyReq>
      </div>
    </Container>
  );
};

export default EmployeeHome;
