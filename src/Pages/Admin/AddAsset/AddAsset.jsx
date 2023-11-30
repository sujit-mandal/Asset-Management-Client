import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCurrentUser from "../../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import moment from "moment";
import { Helmet } from "react-helmet-async";
const AddAsset = () => {
  <Helmet>
    <title>Admin | Add Asset</title>
  </Helmet>;
  const axiosSecure = useAxiosSecure();
  const { data: currentUser } = useCurrentUser();
  const currentDate = moment().format("YYYY-MM-DD");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const assetInfo = {
      admin: currentUser.email,
      assetName: data.assetName,
      addDate: currentDate,
      quantity: parseInt(data.quantity),
      type: data.type,
    };
    console.log(assetInfo);
    axiosSecure.post("/add-asset", assetInfo).then((res) => {
      reset();
      toast.success("Successfully added asset");
    });
  };

  return (
    <section className="bg-gray-50 pt-10 ">
      <div className="px-6 py-8 max-w-lg  mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#00AFEF] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Add an Asset
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Asset Name
                </label>
                <input
                  type="text"
                  {...register("assetName")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Asset Name here..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <select
                  {...register("type")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                >
                  <option disabled selected>
                    Type
                  </option>
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-returnable</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#144279] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAsset;
