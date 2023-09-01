import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {collection, getDocs, onSnapshot} from 'firebase/firestore'
import {db} from './config/firebase'
import ContactCard from './components/ContactCard'
import Add from './components/Add';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Nocontact from './components/Nocontact'

function App() {

  const [contacts,setContacts]=useState([])
  const [isOpen,setOpen]=useState(false)

 const onOpen=()=>{
  setOpen(true)
  document.getElementById('root').style.filter='blur(10px)'
 }
 const onClose=()=>{
  setOpen(false)
  document.getElementById('root').style.filter='blur(0px)'
 }

  useEffect(()=>{
    const getContacts=async()=>{
      try{
        const contactsRef=collection(db,'contacts')
        const contactsSnapshot=await getDocs(contactsRef)
        const contactsList=contactsSnapshot.docs.map((doc)=>{
          return {
            ...doc.data(),
            id: doc.id}
          })

        setContacts(contactsList)

      }catch(err){
        console.log(err)
      }
    }
    getContacts();
  },[])

  const filteredContacts =(e)=> {
    const value=e.target.value

    const contactsRef=collection(db,'contacts')
        onSnapshot(contactsRef,(snapshot)=>{
        const contactsList=snapshot.docs.map((doc)=>{
          return {
            ...doc.data(),
            id: doc.id
          }
          })


        const filteredContacts=contactsList.filter((contact)=>
        contact.name.toLowerCase().includes(value.toLowerCase())
        )

        setContacts(filteredContacts)
        return filteredContacts
        })
  }



  return (
    <>
    <div className='maxsize'>
    <Navbar/>
    <div className='inp'>
    <input className='inputsearch' type='text' placeholder='Search' onChange={filteredContacts}/>
    
    <h1 className='addcontact' onClick={onOpen}>+</h1>
    </div>  
    <div className='showcontact'>
      {contacts.length <= 0 ? (<Nocontact/>)
      :(contacts.map((contact)=>(
       <ContactCard key={contact.id} contact={contact}/>
      ))
    )}
    </div>                        
    </div>
    <Add onClose={onClose} isOpen={isOpen}/>
    <ToastContainer position='bottom-center'/>
    </>
  );
}

export default App;
