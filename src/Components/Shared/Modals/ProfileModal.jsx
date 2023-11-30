import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileModal = ({ open, handleClose, profile, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const updatedProfileInfo = {
      name: data.fullName,
      dob: data.dob,
      email: data.email,
    };

    axiosSecure
      .patch(`/users/update-profile/${profile._id}`, updatedProfileInfo)
      .then((res) => console.log(res.data));
    refetch();
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Update Your Profile
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your Full Name
                  </label>
                  <input
                    defaultValue={profile.name}
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
                    Your Date of Birth
                  </label>
                  <input
                    defaultValue={profile.dob}
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
                    defaultValue={profile.email}
                    readOnly
                    type="email"
                    name="email"
                    id="email"
                    {...register("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Save
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
