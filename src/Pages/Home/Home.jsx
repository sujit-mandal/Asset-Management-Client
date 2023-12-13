import { Helmet } from "react-helmet-async";
import About from "../../Components/About/About";
import Banner from "../../Components/Banner/Banner";
import Package from "../Package/Package";
import Accordions from "../../Components/Accordion/Accordions";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Capital Craft | Home</title>
      </Helmet>
      <div className="-mt-10"><Banner></Banner></div>
      <Package></Package>
      <About></About>
      <Accordions></Accordions>
    </div>
  );
};

export default Home;
