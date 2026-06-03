import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function EnquiryList({data,getAllenquiry,setformData}) {
    let deleteRow=(delid)=>{
      axios.delete(`https://userinquiry-production.up.railway.app/api/website/enquiry/delete/${delid}`)
      .then((res)=>{
        toast.success('Enquiry Deleted Successfully!')
        getAllenquiry()
        
    })
  }

    let editRow=(editid)=>{
      axios.get(`https://userinquiry-production.up.railway.app/api/website/enquiry/single/${editid}`)
      .then((res)=>{
        let data = res.data
        setformData(data.enquiry)
      })
    }
  return (
    <div>
       <div className="bg-gray-200 p-4">
        <ToastContainer/>
                <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>Sr No</TableHeadCell>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        <TableHeadCell>Message</TableHeadCell>
                        <TableHeadCell>
                          <span>Delete</span>
                        </TableHeadCell>
                         <TableHeadCell>
                          <span>Edit</span>
                        </TableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                      {
                        data.length >=1?
                        data.map((item,index)=>{
                          return(
                            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index+1}
                              </TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>{item.phone}</TableCell>
                              <TableCell>{item.message}</TableCell>
                              <TableCell>
                                <button onClick={()=>{deleteRow(item._id)}} className="font-medium text-red-600 hover:underline">Delete</button>
                              </TableCell>
                              <TableCell>
                                <button onClick={()=>{editRow(item._id)}} className="font-medium text-blue-600 hover:underline">Edit</button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      :
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell colSpan={7} className='text-center'>No Data Found</TableCell>
                       </TableRow>
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
    </div>
  )
};
