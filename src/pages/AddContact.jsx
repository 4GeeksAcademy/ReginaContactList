// filepath: /workspaces/ReginaContactList/src/pages/AddContact.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { use } from "react";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
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
    let response;
    if (id) {
      response = await fetch(`${store.apiUrl}/agendas/${store.agendaName}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    }
    else {
      response = await fetch(`${store.apiUrl}/agendas/${store.agendaName}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    }
    if (!response.ok) {
      console.error("Failed to save contact");
      return;
    }
    const data = await response.json();
    console.log("Contact saved:", data);
    if (id) {
      dispatch({ type: "set_contacts", payload: store.contacts.map(contact => contact.id === id ? data : contact) });
    }
    else {
      dispatch({ type: "set_contacts", payload: [...store.contacts, data] });
    }
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const contact = store.contacts.find(contact => contact.id == id);
      if (contact) {
        setForm({
          name: contact.name,
          address: contact.address,
          phone: contact.phone,
          email: contact.email
        });
      } else {
        console.error("Contact not found");
      }
    }
  }
  , [id, store.contacts]);

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Contact": "Add New Contact"}</h2>
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

