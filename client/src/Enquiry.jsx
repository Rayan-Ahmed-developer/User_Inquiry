import React, { useState, useEffect } from "react";
import { Button, TextInput, Textarea, Card } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EnquiryList from "./EnquiryList";
import axios from "axios";

const Enquiry = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", _id: "" });

  const BASE_URL = "https://userinquiry-production.up.railway.app/api/website/enquiry";

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/view`);
      if (res.data.status) setEnquiryList(res.data.enquiryList);
    } catch (error) { toast.error("Failed to load data"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`${BASE_URL}/update/${formData._id}`, formData);
        toast.success("Updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/insert`, formData);
        toast.success("Saved successfully!");
      }
      setFormData({ name: "", email: "", phone: "", message: "", _id: "" });
      fetchEnquiries();
    } catch (error) { toast.error("Operation failed"); }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <ToastContainer position="top-right" />
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Professional Enquiry Management</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 h-fit">
            <h2 className="text-xl font-bold mb-4">{formData._id ? "Update Entry" : "New Enquiry"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextInput value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" required />
              <TextInput value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" type="email" required />
              <TextInput value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone" required />
              <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Message" rows={4} required />
              <Button type="submit" color="blue">{formData._id ? "Update" : "Submit"}</Button>
            </form>
          </Card>

          <div className="lg:col-span-2">
            <EnquiryList data={enquiryList} refresh={fetchEnquiries} setFormData={setFormData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Enquiry;