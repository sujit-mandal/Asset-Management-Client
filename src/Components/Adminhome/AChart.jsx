import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const AChart = () => {
  const { data: currentUser } = useCurrentUser();
  const axiosSecure = useAxiosSecure();
  const COLORS = ["#0088FE", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const {
    data: employeeRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employeerequests", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/all-asset-request/${currentUser?.email}`
      );
      return res.data;
    },
  });
  const data = [
    { name: "Returnable", value: employeeRequests?.returnable?.length || 0 },
    {
      name: "Non Returnable",
      value: employeeRequests?.nonReturnable?.length || 0,
    },
  ];
  console.log(data);
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
              This is a list of latest transactions
            </span>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >
              View all
            </a>
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
                        Transaction
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date & Time
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
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Payment from
                        <span className="font-semibold">Bonnie Green</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 23 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        $2300
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                        Payment refund to
                        <span className="font-semibold">#00910</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 23 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -$670
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Payment failed from{" "}
                        <span className="font-semibold">#087651</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 18 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        $234
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                        Payment from
                        <span className="font-semibold">Lana Byrd</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 15 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        $5000
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Payment from
                        <span className="font-semibold">Jese Leos</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 15 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        $2300
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                        Payment from
                        <span className="font-semibold">THEMESBERG LLC</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 11 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        $560
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Payment from
                        <span className="font-semibold">Lana Lysle</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        Apr 6 ,2021
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        $1437
                      </td>
                    </tr>
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
