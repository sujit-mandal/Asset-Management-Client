import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const HRSignup = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const allPackage = [
    { price: 5, member: 5, details: "5 members for $5", type: "Basic" },
    { price: 8, member: 10, details: "10 members for $8", type: "Premium" },
    {
      price: 20,
      member: 20,
      details: "20 members for $10",
      type: "Professional",
    },
  ];

  const { createUser } = useAuth();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res?.data?.success) {
      createUser(data.email, data.password).then((result) => {
        const seletedPackage = parseInt(data.packages);
        const hrProfileInfo = {
          name: data.fullName,
          company: data.companyName,
          logo: res.data.data.display_url,
          dob: data.dob,
          email: data.email,
          package: allPackage[seletedPackage],
          role: "admin",
          employeeLimitRemaining: 0,
          employeeLimitTotal: 0,
        };

        axiosSecure
          .post("/add-users", hrProfileInfo)
          .then((res) => navigate("/admin/payment"));
        toast.success("Signup Success");
      }).catch((err) => {
        toast.error(err.message);
      })
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link>
          <img className="w-24 h-16 mb-2" src={logo} alt="logo" />
        </Link>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Join As HR/Admin
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex justify-between">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    {...register("fullName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="CompanyName"
                    {...register("companyName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Company name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Upload Company logo
                </label>
                <input
                  className="block w-full p-2.5 sm:text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  {...register("image")}
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG.
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  {...register("dob")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="dd/mm/yyyy"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <select
                  {...register("packages")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                >
                  <option disabled selected>
                    Select a package
                  </option>
                  <option value="0">5 members for $5</option>
                  <option value="1">10 members for $8</option>
                  <option value="2">20 members for $15</option>
                </select>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 dark:text-gray-300">
                    I accept the
                    <a
                      className="font-medium text-primary-600 hover:underline "
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#144279] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HRSignup;
