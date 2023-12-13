import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Paper, Tab } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCurrentUser from "./../../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Support = () => {
  const [value, setValue] = useState("1");
  const axiosSecure = useAxiosSecure();
  const { data: currentUser } = useCurrentUser();
  const { data: myassets, refetch } = useQuery({
    queryKey: ["employeeassets"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee/my-asset-list/${currentUser?.email}`
      );
      return res.data;
    },
  });
  console.log(myassets);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onSubmit = async (data) => {
    if (currentUser?.team === false) {
      reset();
      return toast.error("For Token request please contact with HR");
    }
    const tokenRequest = {
      name: currentUser?.name,
      email: currentUser?.email,
      admin: currentUser?.haveAdmin,
      subject: data.subject,
      department: data.department,
      related: data.asset,
      priority: data.priority,
      status: "Pending",
    };
    axiosSecure.post("/ticket", tokenRequest).then((response) => {
      toast.success("Token request send successfully");
      reset();
    });
    console.log(tokenRequest);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", typography: "body1", paddingTop: "20px" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Open Ticket" value="1" />
              <Tab label="My Tickets" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Paper>
              <h5 className="py-4 px-5 text-3xl font-semibold mb-5">
                Open a Ticket
              </h5>
            </Paper>
            <section className="bg-gray-50 pt-10 ">
              <div className="px-6 py-8 lg:py-0">
                <div className="md:mt-0 xl:p-0 ">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4 md:space-y-6 p-5"
                    >
                      <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            readOnly
                            defaultValue={currentUser.name}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            readOnly
                            defaultValue={currentUser.email}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Subject
                          </label>
                          <input
                            {...register("subject")}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Department
                          </label>
                          <select
                            {...register("department")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            required
                          >
                            <option value="administrative">
                              Administrative
                            </option>
                            <option value="technical">Asset Relevant</option>
                            <option value="general">General</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Related Asset
                          </label>
                          <select
                            {...register("asset")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            required
                          >
                            <option disabled selected>
                              None
                            </option>
                            {myassets?.map((asset) => (
                              <option
                                key={asset.requestDate}
                                value={asset.assetName}
                              >
                                {asset.assetName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Priority
                          </label>
                          <select
                            {...register("priority")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            required
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Message
                        </label>
                        <textarea
                          {...register("additionalInfo")}
                          className="w-full py-3 resize-none border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                          placeholder="Enter your text here..."
                        ></textarea>
                      </div>
                      {/* <div>
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
                      </div> */}
                      <button
                        type="submit"
                        className="w-full text-white bg-[#144279] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Support;
