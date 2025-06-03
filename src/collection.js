import { json } from "react-router-dom";
import { useEffect } from "react";

const functions = {}


functions.getContacts = async () => {

    try{
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
            if(resp.status == 404){
                
            
                const postResp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const postData = await postResp.json();
                
    
                
                
                const getFetch = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
                const getData = await getFetch.json();
            }
                
                const data = await resp.json();
            }catch(error){
                console.log(error)
                
    
            }

    try{

        const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
        const data = await resp.json();

        console.log(data)

        return data;

    }catch(error){

        console.log("Error: ",error)

    }
}

functions.submitContact = async (name, phone, email, address) => {

    try{
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
            if(resp.status == 404){
                
            
                const postResp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const postData = await postResp.json();
                
    
                
                
                const getFetch = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
                const getData = await getFetch.json();
            }
                
                const data = await resp.json();
            }catch(error){
                console.log(error)
                
    
            }

    try{
    const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge/contacts",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "name": name,
                "phone": phone,
                "email": email,
                "address": address,
                "agenda_slug": "Jorge"
              
        })
    });
    const data = await resp.json();


    }catch(error){

        console.log("Error: ",error)

    }
}
    functions.deleteContact = async (id) => {

        try{
                const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
                if(resp.status == 404){
                    
                
                    const postResp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const postData = await postResp.json();
                    
        
                    
                    
                    const getFetch = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
                    const getData = await getFetch.json();
                }
                    
                    const data = await resp.json();
                }catch(error){
                    console.log(error)
                    
        
                }

        try{
    
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge/contacts/" + id,
                {
                method: 'DELETE'
            });
    
        }catch(error){
    
            console.log("Error: ",error)
    
        }
}

functions.editContact = async (id, name,phone,email,address) => {

    try{
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
            if(resp.status == 404){
                
            
                const postResp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const postData = await postResp.json();
                
    
                
                
                const getFetch = await fetch("https://playground.4geeks.com/contact/agendas/Jorge");
                const getData = await getFetch.json();
            }
                
                const data = await resp.json();
            }catch(error){
                console.log(error)
                
    
            }

    try{

        const resp = await fetch("https://playground.4geeks.com/contact/agendas/Jorge/contacts/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "address": address,
                    "agenda_slug": "Jorge"
                }
            )
        });;
        const data = await resp.json();


        return data;

    }catch(error){

        console.log("Error: ",error)

    }
}

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

const deleteContact = (id) => {
  let contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts = contacts.filter(contact => contact.id !== id);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  return Promise.resolve();
};

const editContact = (id, updatedContact) => {
  let contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts = contacts.map(contact =>
    contact.id === id ? { ...contact, ...updatedContact } : contact
  );
  localStorage.setItem("contacts", JSON.stringify(contacts));
  return Promise.resolve();
};

export default { getContacts, addContact, deleteContact, editContact };