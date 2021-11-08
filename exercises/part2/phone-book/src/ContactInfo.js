import React from "react";

const ContactInfo = ({ contact }) => {
    return (
        <p>{contact.name} {contact.number}</p>
    )
}
export default ContactInfo
