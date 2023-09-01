import React, { useState } from 'react'

const useDisclouse = () => {
    const [isOpen,setOpen]=useState(false)

    const onOpen=()=>{
     setOpen(true)
     document.getElementById('root').style.filter='blur(10px)'
    }
    const onClose=()=>{
     setOpen(false)
     document.getElementById('root').style.filter='blur(0px)'
    }
  return (onClose,isOpen,onOpen)
}

export default useDisclouse
