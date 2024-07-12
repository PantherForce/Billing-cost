
import { useLocation } from 'react-router-dom';

const SubmittedData = () => {
  const location = useLocation();
  const { data, totalCost } = location.state as {
    data: {
      name: string;
      email: string;
      breakfast: string;
      lunch: string;
      dinner: string;
      date : any ;
    };
    totalCost: number;
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Submitted Data</h1>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakfast</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lunch</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dinner</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-black-200 text-bold uppercase tracking-wider">Total Cost</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.breakfast}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.lunch}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.dinner}</td>
            <td className="px-6 py-4 whitespace-nowrap text-green-700">${totalCost}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedData;
