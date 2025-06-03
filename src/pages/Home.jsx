import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import collection from "../collection.js";
import { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const cleanContact = async (id) => {
    await collection.deleteContact(id);
    const update = await collection.getContacts();
    dispatch({ type: "contacts", payload: update.contacts });
  };

  useEffect(() => {
    collection.getContacts().then((data) =>
      dispatch({ type: "contacts", payload: data.contacts })
    );
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
            src={el.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
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
              onClick={() => cleanContact(el.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};