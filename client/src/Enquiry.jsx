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
          `https://task-manager-production-7ec3.up.railway.app/api/website/enquiry/update/${formData._id}`,
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
          "https://task-manager-production-7ec3.up.railway.app/api/website/enquiry/insert",
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
      .get("https://task-manager-production-7ec3.up.railway.app/api/website/enquiry/view")
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