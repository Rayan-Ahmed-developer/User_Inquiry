// import React from 'react'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// export default function EnquiryList({data,getAllenquiry,setformData}) {
//     let deleteRow=(delid)=>{
//       axios.delete(`https://userinquiry-production.up.railway.app/api/website/enquiry/delete/${delid}`)
//       .then((res)=>{
//         toast.success('Enquiry Deleted Successfully!')
//         getAllenquiry()
        
//     })
//   }

//     let editRow=(editid)=>{
//       axios.get(`https://userinquiry-production.up.railway.app/api/website/enquiry/single/${editid}`)
//       .then((res)=>{
//         let data = res.data
//         setformData(data.enquiry)
//       })
//     }
//   return (
//     <div>
//        <div className="bg-gray-200 p-4">
//         <ToastContainer/>
//                 <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableHeadCell>Sr No</TableHeadCell>
//                         <TableHeadCell>Name</TableHeadCell>
//                         <TableHeadCell>Email</TableHeadCell>
//                         <TableHeadCell>Phone</TableHeadCell>
//                         <TableHeadCell>Message</TableHeadCell>
//                         <TableHeadCell>
//                           <span>Delete</span>
//                         </TableHeadCell>
//                          <TableHeadCell>
//                           <span>Edit</span>
//                         </TableHeadCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody className="divide-y">
//                       {
//                         data.length >=1?
//                         data.map((item,index)=>{
//                           return(
//                             <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                               <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                                 {index+1}
//                               </TableCell>
//                               <TableCell>{item.name}</TableCell>
//                               <TableCell>{item.email}</TableCell>
//                               <TableCell>{item.phone}</TableCell>
//                               <TableCell>{item.message}</TableCell>
//                               <TableCell>
//                                 <button onClick={()=>{deleteRow(item._id)}} className="font-medium text-red-600 hover:underline">Delete</button>
//                               </TableCell>
//                               <TableCell>
//                                 <button onClick={()=>{editRow(item._id)}} className="font-medium text-blue-600 hover:underline">Edit</button>
//                               </TableCell>
//                             </TableRow>
//                           )
//                         })
//                       :
//                       <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                         <TableCell colSpan={7} className='text-center'>No Data Found</TableCell>
//                        </TableRow>
//                       }
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//     </div>
//   )
// };
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EnquiryList({ data = [], refresh, setFormData }) {

  const deleteRow = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://userinquiry-production.up.railway.app/api/website/enquiry/delete/${id}`
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