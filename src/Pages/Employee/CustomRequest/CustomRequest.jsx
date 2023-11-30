import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "./../../../hooks/useCurrentUser";
import toast from "react-hot-toast";
const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CustomRequest = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data: currentUser } = useCurrentUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.assetImage[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res?.data?.success) {
      const customAsset = {
        email: currentUser.email,
        assetName: data.assetName,
        admin: currentUser.haveAdmin,
        price: data.price,
        type: data.type,
        assetImage: res.data.data.display_url,
        reason: data.requestReason,
        additionalInfo: data.additionalInfo,
        status: "Pending",
      };
      axiosSecure
        .post("/employee/create-custom-request", customAsset)
        .then((response) => {
          toast.success("Custom asset request send successfully");
          reset();
        });
    }
  };

  return (
    <section className="bg-gray-50 pt-10 ">
      <div className="px-6 py-8 max-w-lg  mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#00AFEF] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create Custom Request
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex justify-between">
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
                    Price
                  </label>
                  <input
                    type="text"
                    {...register("price")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Price"
                    required
                  />
                </div>
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Upload Image
                </label>
                <input
                  className="block w-full p-2.5 sm:text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                  type="file"
                  {...register("assetImage")}
                />
                <p
                  className="mt-1 text-sm text-black dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG.
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Why you need this?
                </label>
                <textarea
                  {...register("requestReason")}
                  className="w-full resize-none py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your text here. More than 30 Characters"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Additional Information
                </label>
                <textarea
                  {...register("additionalInfo")}
                  className="w-full py-3 resize-none border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your text here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#144279] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomRequest;
