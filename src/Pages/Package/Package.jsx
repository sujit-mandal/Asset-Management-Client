import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Paper } from "@mui/material";
import PaymentModal from "../../Components/Shared/Modals/PaymentModal";
import useCurrentUser from "../../hooks/useCurrentUser";

const Package = () => {
  const { data: user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [packageInfo, setPackageInfo] = useState({});
  const handleOpen = (type, details, member, price) => {
    setIsOpen(true);
    setPackageInfo({
      type: type,
      details: details,
      member: member,
      price: price,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-gray-100 p-10">
      <div className="flex justify-center items-center">
        <Paper sx={{ width: "400px", paddingY: "10px", marginBottom: "20px" }}>
          <h1 className="text-3xl md:text-5xl underline text-center mb-5">
            Choose a Plan
          </h1>
        </Paper>
      </div>
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="rounded-lg w-full overflow-hidden shadow-md bg-white ">
          <div className="px-6 py-8 flex flex-col items-center text-center mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-[#00AFEF]">Basic</h3>
            <p className="text-xl text-gray-600 mb-8 font-semibold">
              <svg
                className="w-5 h-5 mr-2 font-semibold inline leading-7 text-[#00AFEF] sm:h-5 sm:w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              5 Members for $5
            </p>
            <h2 className="text-5xl font-bold mb-8 text-[#00AFEF]">$5</h2>
            <button
              onClick={() => handleOpen("Basic", "5 Members for $5", 5, 5)}
              className="bg-[#00AFEF] text-white py-2 px-4 rounded-lg text-lg hover:bg-[#176986] transition duration-300 ease-in-out"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md bg-white ">
          <div className="px-6 py-8 flex flex-col items-center text-center mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-green-600">Premium</h3>
            <p className="text-xl text-gray-600 mb-8 font-semibold">
              <svg
                className="w-5 h-5 mr-2 font-semibold inline leading-7 text-green-600 sm:h-5 sm:w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              10 Members for $8
            </p>
            <h2 className="text-5xl font-bold mb-8 text-green-600">$8</h2>
            <button
              onClick={() => handleOpen("Premium", "10 Members for $8", 10, 8)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md bg-white ">
          <div className="px-6 py-8 flex flex-col items-center text-center mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-[#144279]">
              Professional
            </h3>
            <p className="text-xl text-gray-600 mb-8 font-semibold">
              <svg
                className="w-5 h-5 mr-2 font-semibold inline leading-7 text-[#144279] sm:h-5 sm:w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              20 Members for $15
            </p>
            <h2 className="text-5xl font-bold mb-8 text-[#144279]">$15</h2>
            <button
              onClick={() =>
                handleOpen("Professional", "20 Members for $15", 20, 15)
              }
              className="bg-[#144279] text-white py-2 px-4 rounded-lg text-lg hover:bg-[#093c7b] transition duration-300 ease-in-out"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isOpen}
        closeModal={closeModal}
        packageInfo={packageInfo}
        user={user}
      ></PaymentModal>
    </div>
  );
};

export default Package;
