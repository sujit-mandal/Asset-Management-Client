import AChart from "../../../Components/Adminhome/AChart";
import APendingReq from "../../../Components/Adminhome/APendingReq";
import ALimited from "../../../Components/Adminhome/ALimited";
import Astats from "../../../Components/Adminhome/Astats";
import { Container } from "@mui/material";

const AdminHome = () => {
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
