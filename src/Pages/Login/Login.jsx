import { useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signIn(data.email, data.password).then(() => {
      currentUser?.role === "admin"
        ? navigate("/admin/dashboard")
        : currentUser?.role === "employee"
        ? navigate("/employee/dashboard")
        : navigate("/");
    });
  };
  return (
    <section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 mx-auto">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={logo} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are Capital Craft Team
                      </h4>
                    </div>

                    <form
                      className="space-y-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <p className="mb-4">Please login to your account</p>

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

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-cyan-500 to-blue-500"
                          type="submit"
                        >
                          Log in
                        </button>

                        <a href="#!">Forgot password?</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-cyan-500 to-blue-500">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
