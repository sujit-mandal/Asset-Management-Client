import { Container } from "@mui/material";
import ECustomReq from "../../../Components/Employehome/ECustomReq";
import EMonthlyReq from "../../../Components/Employehome/EMonthlyReq";
import EPendingReq from "../../../Components/Employehome/EPendingReq";
import FreReqItem from "../../../Components/Employehome/FreReqItem";

const EmployeeHome = () => {
  return (
    <Container maxWidth="xl">
      <div className="mx-auto">
        <ECustomReq></ECustomReq>
        <EPendingReq></EPendingReq>
        <EMonthlyReq></EMonthlyReq>
        <FreReqItem></FreReqItem>
      </div>
    </Container>
  );
};

export default EmployeeHome;
