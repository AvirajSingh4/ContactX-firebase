import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
//import EditIcon from '@mui/icons-material/Edit';
import {deleteDoc,doc} from 'firebase/firestore'
import {db} from '../config/firebase'
//import AddandUpdate from './AddandUpdate'
//import useDisclouse from '../hooks/useDisclouse'
import Add from './Add'
import {toast} from 'react-toastify'

const ContactCard = ({contact}) => {
  //const {isOpen,onClose,onOpen}=useDisclouse()
  const [isOpen,setOpen]=useState(false)
  const [isUpdate,setUpdate]=useState(false)

  const onOpen=()=>{
   setOpen(true)
   setUpdate(true)
   document.getElementById('root').style.filter='blur(10px)'
  }
  const onClose=()=>{
   setOpen(false)
   document.getElementById('root').style.filter='blur(0px)'
  }

  const deleteContact=async(id)=>{
    try {
      await deleteDoc(doc(db,'contacts',id))
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className='contactdata' key={contact.id}>
    <div className='contactname'>
      <Avatar>{contact.name[0]}</Avatar>
      &nbsp;
      <h2 className='name'>{contact.name}</h2>
      </div>
      <p className='email'>email | {contact.email}</p>
      <div className='editdelete'>
      {/*<EditIcon isUpdate={isUpdate} className='update' onClick={onOpen}/>&nbsp;&nbsp;*/}
      <DeleteIcon className='del' onClick={()=>deleteContact(contact.id)}/>
      </div>
      </div>
      <Add isUpdate isOpen={isOpen} onClose={onClose}/>
      </>
  )
}

export default ContactCard
