import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Shared/Navbar/Navbar";
import NavbarMUI from "../Components/Shared/Navbar/NavbarMUI";
import Footer from "../Components/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";
const Mainlayout = () => {
  return (
    <div>
      <Toaster />
      <NavbarMUI />
      {/* <Navbar /> */}
      <div className="mt-16 lg:mt-28">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Mainlayout;
