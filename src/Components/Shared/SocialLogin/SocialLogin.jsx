import { AiOutlineGoogle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const SocialLogin = () => {
  const { GoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((res) => {
        const employeeProfileInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          profilePhoto: res?.user?.photoURL,
          dob: "",
          team: false,
          haveAdmin: null,
          companylogo: null,
          role: "employee",
        };
        console.log(res);
        axiosSecure.post("/add-users", employeeProfileInfo).then((res) => {
          toast.success("Signup Success");
        });
        navigate("/employee/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  return (
    <div className="m-2">
      <div className="flex items-center gap-3 ">
        <hr className="w-1/2 border-[1px] border-primary-color" />
        <div className="text-white">OR</div>
        <hr className="w-1/2 border-[1px] border-primary-color" />
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="bg-[#F5A623] hover:bg-[#e79044] flex items-center mx-auto mt-3 text-white text-lg py-3 w-fit px-4 rounded-3xl"
      >
        <AiOutlineGoogle className="text-4xl"></AiOutlineGoogle>Login with
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
