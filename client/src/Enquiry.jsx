// import React, { useState,useEffect } from "react";
// import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
// import { ToastContainer , toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import EnquiryList from "./EnquiryList";
// import axios from "axios";

// const Enquiry = () => {
//   const [enquiryList, setenquiryList] = useState([])
//   const [formData, setformData] = useState({
//     name:'',
//     email:'',
//     phone:'',
//     message:'',
//     _id:''
//   })


//   let saveEnquiry = (e) => {
//     e.preventDefault();

//     // let formData={
//     //   name:e.target.name.value,
//     //   email:e.target.email.value,
//     //   phone:e.target.phone.value,
//     //   message:e.target.message.value
//     // }
//     if(formData._id){
//       axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`,formData)
//       .then((res)=>{
//         console.log(res.data)
//         toast.success('Enquiry Updated Successfully!')
//         setformData({
//           name:'',
//           email:'',
//           phone:'',
//           message:'',
//           _id:''
//          })
//           getAllenquiry()
//       })
//     }
//     else{
         
//     axios.post('http://localhost:8020/api/website/enquiry/insert',formData)
//     .then((res)=>{
//       console.log(res.data)
//       toast.success('Enquiry Saved Successfully!')
//       setformData({
//         name:'',
//         email:'',
//         phone:'',
//         message:''
//        })
//         getAllenquiry()
//     })
//   };
  
// }
 

//   let getAllenquiry = () =>{
//     axios.get('http://localhost:8020/api/website/enquiry/view')
//     .then((res)=>{
//         return(res.data)
//     })
//     .then((finalData) =>{
//       if(finalData.status){
//         setenquiryList(finalData.enquiryList)
//       }
//     })
//   }

//   let getValue=(e)=>{
//     let inputName = e.target.name 
//     let inputValue = e.target.value
//     let oldData = {...formData}
//     oldData[inputName]=inputValue;
//     setformData(oldData)
//   }

//   useEffect(() => {
//     getAllenquiry()
//   }, [])
  
//   return (
//   <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-8 overflow-hidden">
    
//     <ToastContainer />

//     {/* Heading */}
//     <div className="mb-8 text-center">

//       <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
//         User Enquiry
//       </h1>

//       <p className="text-gray-500 mt-3 text-sm md:text-base">
//         Manage customer enquiries professionally
//       </p>

//     </div>

//     {/* Main Layout */}
//     <div className="grid grid-cols-1 xl:grid-cols-[380px_auto] gap-6">

//       {/* Left Form Section */}
//       <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 h-fit">

//         {/* Form Header */}
//         <div className="mb-6">

//           <h2 className="text-2xl font-bold text-gray-800">
//             Enquiry Form
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             Fill details to save enquiry
//           </p>

//         </div>

//         {/* Form */}
//         <form onSubmit={saveEnquiry}>

//           {/* Name */}
//           <div className="mb-5">

//             <Label
//               htmlFor="name"
//               className="mb-2 block text-sm font-semibold text-gray-700"
//             >
//               Your Name
//             </Label>

//             <TextInput
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={getValue}
//               placeholder="Enter your name"
//               required
//               sizing="lg"
//               className="focus:ring-0"
//             />

//           </div>

//           {/* Email */}
//           <div className="mb-5">

//             <Label
//               htmlFor="email"
//               className="mb-2 block text-sm font-semibold text-gray-700"
//             >
//               Your Email
//             </Label>

//             <TextInput
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={getValue}
//               placeholder="Enter your email"
//               required
//               sizing="lg"
//             />

//           </div>

//           {/* Phone */}
//           <div className="mb-5">

//             <Label
//               htmlFor="phone"
//               className="mb-2 block text-sm font-semibold text-gray-700"
//             >
//               Your Phone
//             </Label>

//             <TextInput
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={getValue}
//               placeholder="Enter your phone"
//               required
//               sizing="lg"
//             />

//           </div>

//           {/* Message */}
//           <div className="mb-6">

//             <Label
//               htmlFor="message"
//               className="mb-2 block text-sm font-semibold text-gray-700"
//             >
//               Your Message
//             </Label>

//             <Textarea
//               name="message"
//               value={formData.message}
//               onChange={getValue}
//               placeholder="Write your message..."
//               required
//               rows={5}
//               className="resize-none"
//             />

//           </div>

//           {/* Button */}
//           <Button
//             type="submit"
//             className="w-full !bg-indigo-600 hover:!bg-indigo-700 border-0 rounded-xl h-[50px] text-base font-semibold transition-all duration-300"
//           >
//             {
//               formData._id
//               ?
//               "Update Enquiry"
//               :
//               "Save Enquiry"
//             }
//           </Button>

//         </form>

//       </div>

//       {/* Right Table */}
//       <div className="min-w-0">
//         <EnquiryList
//           data={enquiryList}
//           getAllenquiry={getAllenquiry}
//           setformData={setformData}
//         />
//       </div>

//     </div>

//   </div>
// );
// }
// export default Enquiry;

import React, { useState, useEffect } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EnquiryList from "./EnquiryList";
import axios from "axios";

const Enquiry = () => {
  const [enquiryList, setenquiryList] = useState([]);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  // SAVE / UPDATE
  let saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      axios
        .put(
          `http://localhost:8020/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then(() => {
          toast.success("Enquiry Updated Successfully!");
          setformData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllenquiry();
        });
    } else {
      axios
        .post(
          "http://localhost:8020/api/website/enquiry/insert",
          formData
        )
        .then(() => {
          toast.success("Enquiry Saved Successfully!");
          setformData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getAllenquiry();
        });
    }
  };

  // GET ALL
  let getAllenquiry = () => {
    axios
      .get("http://localhost:8020/api/website/enquiry/view")
      .then((res) => {
        if (res.data.status) {
          setenquiryList(res.data.enquiryList);
        }
      });
  };

  // INPUT CHANGE
  let getValue = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllenquiry();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <ToastContainer />

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          User Enquiry Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage all customer enquiries
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

        {/* FORM */}
        <div className="w-full lg:w-[360px] bg-white p-6 rounded-xl shadow-md h-fit">

          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Enquiry Form
          </h2>

          <form onSubmit={saveEnquiry}>

            {/* NAME */}
            <div className="mb-4">
              <Label>Name</Label>
              <TextInput
                name="name"
                value={formData.name}
                onChange={getValue}
                placeholder="Enter name"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <Label>Email</Label>
              <TextInput
                type="email"
                name="email"
                value={formData.email}
                onChange={getValue}
                placeholder="Enter email"
                required
              />
            </div>

            {/* PHONE */}
            <div className="mb-4">
              <Label>Phone</Label>
              <TextInput
                name="phone"
                value={formData.phone}
                onChange={getValue}
                placeholder="Enter phone"
                required
              />
            </div>

            {/* MESSAGE */}
            <div className="mb-5">
              <Label>Message</Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={getValue}
                rows={4}
                placeholder="Write message"
                required
              />
            </div>

            {/* BUTTON */}
            <Button type="submit" className="w-full">
              {formData._id ? "Update Enquiry" : "Save Enquiry"}
            </Button>

          </form>

        </div>

        {/* TABLE */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md overflow-x-auto">

          <EnquiryList
            data={enquiryList}
            getAllenquiry={getAllenquiry}
            setformData={setformData}
          />

        </div>

      </div>
    </div>
  );
};

export default Enquiry;