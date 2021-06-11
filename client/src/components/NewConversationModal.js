import React,{useState} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {useContacts} from '../contexts/ContactsProvider';
import {useConversations} from '../contexts/ConversationsProvider'
export default function NewConversationModal({closeModal}) {

    const {contacts}=useContacts();
    const {createConversation}=useConversations();
    const [selectContactsIds,setSelectContactIds]=useState([]);

    function handleCheckBoxChange(contactId){
        setSelectContactIds(prevSelectedContactIds=>{
            if(prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevId=>{
                    return contactId!==prevId
                })
            }else{
                return [...prevSelectedContactIds,contactId]
            }
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        createConversation(setSelectContactIds);
        closeModal();
    }
  return (
    <div>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            {contacts.map(contact=>(
                <Form.Group controlId={contact.id}key={contact.id} >
                    <Form.Check 
                    type="checkbox"
                    value={selectContactsIds.includes(contact.id)}
                    label={contact.name}
                    onchange={()=>handleCheckBoxChange(contact.id)}                    
                    />
                </Form.Group>
            ))}
          <Button type="submit">Create Conversation</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
