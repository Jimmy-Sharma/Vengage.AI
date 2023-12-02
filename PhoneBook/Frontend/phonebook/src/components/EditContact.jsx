import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getContactById, updateContact } from "../redux/action";
import '../Styling/AddNewContact.css'
import toast from "react-hot-toast";

function EditContact() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [editedContact, setEditedContact] = useState(null);
    const dispatch = useDispatch();

    const contactFromRedux = useSelector((state) => state.contactReducer.selectedContact);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState();

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
    const handleContactChange = (e) => {
        setNewNumber(e.target.value);
    };


    useEffect(() => {
        if (id) {
            if (!editedContact || editedContact.id !== id) {
                dispatch(getContactById(id)).catch((error) => {
                    console.error(error);
                });
            }
        }
    }, [dispatch, id, editedContact]);

    useEffect(() => {
        setEditedContact(contactFromRedux);
    }, [id]);

    const handleUpdateContact = () => {
        console.log(newName, newNumber)
        let updatedContact = { name: newName, number: newNumber }
        dispatch(updateContact(id, updatedContact));
        toast.success("Contact Updated Successfully");
        navigate(`/`);
    };

    const movetocontact = () => {
        navigate(`/`)
    }

    return (
        <div className="AddNewContactContainer">
            <div className="AddNewContactMainContainer">
                <div className="heading">
                    <h2>Edit Contact</h2>
                </div>
                <div className="inputbox">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="inputbox">
                    <label>Contact Number:</label>
                    <input
                        type="number"
                        value={newNumber}
                        onChange={handleContactChange}
                    />
                </div>
                <div className="addBTNContainer">
                    <button onClick={handleUpdateContact} className="addBTN">Edit Contacts
                        <img src="edit-button.png" alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditContact;