import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EnquiryList({ data = [], refresh, setFormData }) {

  const deleteRow = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://userinquiry-production-8086.up.railway.app/api/website/enquiry/delete/${id}`
      );

      toast.success("Deleted successfully!");
      refresh?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting item");
    }
  };

  return (
    <div className="overflow-x-auto">

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3 font-semibold">{item.name}</td>

                <td className="p-3">{item.email}</td>

                <td className="p-3">
                  <button
                    onClick={() => setFormData(item)}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteRow(item._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {data?.map((item) => (
          <div
            key={item._id}
            className="p-4 border-b bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs text-gray-500">{item.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFormData(item)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteRow(item._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}