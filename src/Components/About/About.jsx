
// Complete

import { Paper } from "@mui/material";

const About = () => {
  return (
    <div className="py-16 bg-white">
      <div className="flex justify-center items-center">
        <Paper sx={{ width: "400px", paddingY: "10px", marginBottom: "20px" }}>
          <h1 className="text-3xl md:text-5xl underline text-center mb-5">
            About us
          </h1>
        </Paper>
      </div>
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className=" md:w-5/12 lg:w-5/12">
            <img
              src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-2xl text-center md:text-left text-gray-900 font-bold md:text-4xl">
              <span>Capital Craft</span> Unleashing the Power of Asset
              Management.
            </h2>
            <p className="mt-6 text-gray-600">
              Welcome to Capital Craft, where precision and efficiency converge
              to redefine the landscape of physical asset and equipment
              management. At Capital Craft, we recognize that each physical
              asset, from state-of-the-art machinery to essential office
              equipment, is a vital cog in the machinery of your success.
            </p>
            <p className="mt-4 text-gray-600">
              Our mission is to empower businesses with a comprehensive and
              intuitive asset management system. We understand that the key to
              seamless operations lies in the precision of managing physical
              assets, and Capital Craft is the tool designed to craft that
              precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
