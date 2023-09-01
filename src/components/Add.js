import React from 'react'
import {createPortal} from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import {Formik,Form,Field} from 'formik'
import {addDoc,collection, updateDoc} from 'firebase/firestore'
import {db} from '../config/firebase'
import {toast} from 'react-toastify'



const Add = ({onClose,isOpen,isUpdate,contact}) => {
  
  const addContact=async(contact)=>{
    try{
      const contactRef=collection(db,'contacts')
      await addDoc(contactRef,contact)
      toast.success("Contact added successfully")
      onClose()
    }catch(err){
      console.log(err);
    }
  }


 /* const updateContact=async(contact,id)=>{
    try{
      const contactRef=collection(db,'contacts',id)
      await updateDoc(contactRef,contact)
      onClose()
    }catch(err){
      console.log(err);
    }
  }*/


return createPortal(
<>
{isOpen && (
  <>
    <div className='add'>
  <div className='close'>
  <CloseIcon onClick={onClose}/>
  </div>

  <Formik className='formadd' 
  initialValues={
    isUpdate?
    {
      name: contact.name,
      email: contact.email,
    }
    :{
    name:"",
    email:"",
    } 
} 
    onSubmit={(values)=>{
      //console.log(values)
      isUpdate? updateContact(values,contact.id) : addContact(values)
  }} >
    <Form className='form'>
    <Field name="name" placeholder='Name'/>
    <Field name="email" placeholder='Email'/>
    <button>{isUpdate?"Update":"Add"} contact</button>
    </Form>
  </Formik>

  </div>
  <div className='blur'/>
  </>
  )}
</>,
document.getElementById('modal-root')
  )
}

export default Add
