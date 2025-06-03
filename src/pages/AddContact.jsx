// filepath: /workspaces/ReginaContactList/src/pages/AddContact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import collection from "../collection.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const defaultImage = "https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg";
    await collection.addContact({ ...form, image: defaultImage });
    const update = await collection.getContacts();
    dispatch({ type: "contacts", payload: update.contacts });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="w-50 m-auto">
        <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="form-control mb-2" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input className="form-control mb-2" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
};

// filepath: /workspaces/ReginaContactList/src/collection.js
const getContacts = () => {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  return Promise.resolve({ contacts });
};

const addContact = (contact) => {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts.push({ ...contact, id: Date.now() });
  localStorage.setItem("contacts", JSON.stringify(contacts));
  return Promise.resolve();
};

export default { getContacts, addContact };