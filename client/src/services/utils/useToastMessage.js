import { toast } from "react-toastify";

export default function useToastMessage() {

    const showSuccessMessage=(message)=>{
        toast.success(message)
    }

    const showErrorMessage=(message)=>{
        toast.error(message)
    }

  return [showSuccessMessage,showErrorMessage]
}
