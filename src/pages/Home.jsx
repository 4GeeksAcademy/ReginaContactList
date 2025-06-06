import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const getContacts = async () => {
    try {
      const response = await fetch(`${store.apiUrl}/agendas/${store.agendaName}`);
      if (response.status === 404) {
        console.error("Agenda not found, creating a new one...");
        await createAgenda();
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      console.log("Contacts fetched:", data);
      dispatch({ type: "set_contacts", payload: data.contacts });
    }
    catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  const createAgenda = async () => {
    try {
      const response = await fetch(`${store.apiUrl}/agendas/${store.agendaName}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create agenda");
      }

      const data = await response.json();
      console.log("Agenda created:", data);
    } catch (error) {
      console.error("Error creating agenda:", error);
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${store.apiUrl}/agendas/${store.agendaName}/contacts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      const updatedContacts = store.contacts.filter(contact => contact.id !== id);
      dispatch({ type: "set_contacts", payload: updatedContacts });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }


  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="text-center mt-5">
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => navigate("/add")}
      >
        Create new contact
      </button>

      {store?.contacts?.map((el, i) => (
        <div
          key={i}
          className="contact-card-custom m-auto mb-4"
        >
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Avatar"
            className="contact-avatar-custom"
          />
          <div className="contact-info-custom">
            <h5 className="contact-name-custom">{el.name}</h5>
            <p className="contact-detail-custom">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {el.address}
            </p>
            <p className="contact-detail-custom">
              <i className="fas fa-phone mr-2"></i>
              {el.phone}
            </p>
            <p className="contact-detail-custom">
              <i className="fas fa-envelope mr-2"></i>
              {el.email}
            </p>
          </div>
          <div className="contact-actions-custom">
            <button
              className="btn btn-success mb-2"
              onClick={() => navigate(`/edit/${el.id}`)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteContact(el.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};