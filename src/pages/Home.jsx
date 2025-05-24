import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import collection from "../collection.js"
import { useEffect, useState } from "react";

export const Home = () => {

	


  const {store, dispatch} =useGlobalReducer()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [newId, setNewId] = useState(null);

  function resetData(){
	setNewId(null);
	setName("");
	setPhone("");
	setEmail("");
	setAddress("");

  }

  function saveId(obj){
	setNewId(obj.id);
	setName(obj.name);
	setPhone(obj.phone);
	setEmail(obj.email);
	setAddress(obj.address);
  }

  const uploadContact = async () => {
	
		await collection.submitContact(name,phone,email,address)
		const update = await collection.getContacts();
		dispatch({ type: "contacts", payload: update.contacts });

		setName("");
		setPhone("");
		setEmail("");
		setAddress("");


  }

  
  	const cleanContact = async (id) => {

	await collection.deleteContact(id)
	const update = await collection.getContacts();
	dispatch({ type: "contacts", payload: update.contacts });


} 

	const editContact = async (id,name,phone,email,address) => {

	
	await collection.editContact(id,name,phone,email,address)
	const update = await collection.getContacts();
	dispatch({ type: "contacts", payload: update.contacts });

		setName("");
		setPhone("");
		setEmail("");
		setAddress("");



}
  



  useEffect(()=>{

	collection.getContacts().then(data=>dispatch({type: 'contacts', payload: data.contacts}))

    },[])


	return (
		<div className="text-center mt-5">

<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => resetData()}>
  Create new contact
</button>



<div className="modal fade" id="modal2" tabIndex="-1" role="dialog" aria-labelledby="modal2Label" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modal2Label">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
		<p>Name</p>
		<input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
		<p className="mt-2">Phone number</p>
		<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
		<p className="mt-2">E-mail</p>
		<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
		<p className="mt-2">Address</p>
		<input type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button 
		type="button" 
		className="btn btn-primary" 
		onClick={() => editContact(newId,name,phone,email,address)}>Modify</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
		<p>Name</p>
		<input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
		<p className="mt-2">Phone number</p>
		<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
		<p className="mt-2">E-mail</p>
		<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
		<p className="mt-2">Address</p>
		<input type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button 
		type="button" 
		className="btn btn-primary" 
		onClick={() => uploadContact()}>Create</button>
      </div>
    </div>
  </div>
</div>

















			
			{store?.contacts?.map((el,i) => <div key={i} className="card carta p-3 m-auto">
												<h3>{el.name}</h3>
												<p><strong>Phone number: </strong>{el.phone}</p>
												<p><strong>E-mail: </strong>{el.email}</p>
												<p><strong>Address: </strong>{el.address}</p>
												<div>
													<button className="rounded formatoBoton btn btn-success mx-2"  data-toggle="modal" data-target="#modal2" onClick={() => saveId(el)}><i className="fa-solid fa-pen-to-square"></i></button>
													<button className="rounded formatoBoton btn btn-danger mx-2" onClick={() => cleanContact(el.id)}><i className="fa-solid fa-trash"></i></button>
												</div>
											</div>)}

			
		</div>
	);
}; 