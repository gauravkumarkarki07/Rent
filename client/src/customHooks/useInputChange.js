import { useState } from "react"

export default function useInputChange(initialFormState) {
    const [formData,setFormData]=useState(initialFormState);

    const handleInputChange=(e)=>{
      const{name,value}=e.target;
      setFormData({...formData,[name]:value})
    }

    const clearInputField=()=>{
      setFormData(initialFormState)
    }
  
  return [formData,handleInputChange,clearInputField];
}
