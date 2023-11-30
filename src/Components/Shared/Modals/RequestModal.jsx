import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import moment from "moment";
import useCurrentUser from "../../../hooks/useCurrentUser";
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

const RequestModal = ({ open, handleClose, item }) => {
  const { data: currentUser } = useCurrentUser();
  const currentDate = moment().format("YYYY-MM-DD");
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalMessage = e.target.message.value;
    const employeeRequest = {
      userName: currentUser.name,
      userEmail: currentUser.email,
      admin: currentUser.haveAdmin,
      requestDate: currentDate,
      assetName: item?.assetName,
      type: item?.type,
      note: additionalMessage,
      status: "Pending",
    };
    console.log(employeeRequest);
    await axiosSecure
      .post("/employee/asset-request", employeeRequest)
      .then((res) => toast.success("Request sent"));
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
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Additional Message
              </label>
              <textarea
                name="message"
                className="block w-full h-32 px-5 resize-none py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Request
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestModal;
