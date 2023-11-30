import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const AChart = () => {
  const axiosSecure = useAxiosSecure();
  const COLORS = ["#0088FE", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const { data: currentUser, isLoading } = useCurrentUser();
  const [paymentInfo, setPaymentInfo] = useState([0]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(
          `/admin/payment-info/${currentUser?.email}`
        );
        setPaymentInfo(res.data);
      } catch (error) {
        console.error("Error fetching payment info:", error);
      }
    };
    fetchData();
  }, [axiosSecure, currentUser]);

  if (isLoading) return <Spinner></Spinner>;
  const { data: employeeRequests, refetch } = useQuery({
    queryKey: ["employeerequests", currentUser?.email],
    // enabled: !currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/all-asset-request/${currentUser?.email}`
      );
      return res.data;
    },
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (currentUser?.email) {
  //       const res = await axiosSecure.get(
  //         `/admin/all-asset-request/${currentUser?.email}`
  //       );
  //       console.log(res.data);
  //     }
  //   };
  //   fetchData();
  // }, [currentUser?.email, axiosSecure]);

  const data = [
    { name: "Returnable", value: employeeRequests?.returnable?.length || 0 },
    {
      name: "Non Returnable",
      value: employeeRequests?.nonReturnable?.length || 0,
    },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Analytics
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div style={{ width: "100%", height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={800} height={500}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend></Legend>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Latest Transactions
            </h3>
            <span className="text-base font-normal text-gray-500">
              This is a list of latest 5 transactions
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Transaction ID
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {paymentInfo?.map((payment) => (
                      <tr key={payment.paymentID}>
                        <td className="p-2 whitespace-nowrap text-sm font-normal text-gray-900">
                          {payment.paymentID}
                        </td>
                        <td className="p-2 whitespace-nowrap text-sm font-normal text-gray-500">
                          {payment.date}
                        </td>
                        <td className="p-2 text-center whitespace-nowrap text-sm font-semibold text-gray-900">
                          {payment.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AChart;
