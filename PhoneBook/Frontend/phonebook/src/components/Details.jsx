import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteContact, getContactById } from "../redux/action";
import toast from "react-hot-toast";

function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(id)
    const contact = useSelector((state) => state.contactReducer.selectedContact);
    console.log(contact)

    useEffect(() => {
        if (id) {
            dispatch(getContactById(id)).catch((error) => {
                console.error(`Error fetching contact with ID ${id}:`, error);
            });
        }
    }, [dispatch, id]);
    const deletecontacthandle = () => {
        if (id) {
            dispatch(deleteContact(id)).catch((error) => {
                console.error(`Error deleting contact with ID ${id}:`, error);
            });
        }
        navigate("/");
    };
    const moveback = () => {
        navigate("/")
    }
    return (
        <div className="ContactDetails" id="ContactDetails">
            <div className="back-btn">
                <i onClick={moveback} class="fa-solid fa-arrow-left"></i>
                <i onClick={deletecontacthandle} class="fa-solid fa-trash"></i>
            </div>
            <div className="ContactDetails-logo">
                <i className="fa-solid fa-user"></i>
            </div>
            <div className="contact-name">
                <h1>
                {contact ? contact.name : 'Loading...'}
                </h1>
                {/* <Link to={`/contact-edit/${id}`}>
                    <i class="fa-solid fa-pen-to-square"></i>
                </Link> */}
            </div>
            <div className="mobile">
            <span> +91{contact ? contact.number : 'Loading...'} </span>

                <i className="fa-solid fa-phone"></i>
            </div>
            <div className="fav">
                <i onClick={() => toast.success("Contact Added to Favourites !", {
                    style: {
                        borderRadius: "50px",
                        background: "#000428",
                        color: "#ffffff",
                        padding: "1rem 1.5rem",
                        fontWeight: "600",
                    },
                })} class="fa-solid fa-heart"></i>
                <Link to={`/contact-edit/${id}`}>
                    <i class="fa-solid fa-pen-to-square"></i>
                </Link>
            </div>
        </div>
    );
}

export default Details;