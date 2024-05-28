import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth"
import { firebaseApp } from "../services/firebase.js";
import { toast } from "react-toastify";
import { loadingStart,loginSuccess,error } from "../services/redux/user/userSlice";

export default function OAuthButton(props) {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const showSuccessMessage=(message)=>{
    toast.success(message)
  }

  const showErrorMessage=(message)=>{
      toast.error(message)
  }


  const auth=getAuth(firebaseApp);

  const handleGoogleClick=async()=>{
    dispatch(loadingStart());
    const provider= new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try {
      const resultFromGoogle=await signInWithPopup(auth,provider);
      const response=await fetch('/api/auth/googlelogin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:resultFromGoogle.user.email,
          username:resultFromGoogle.user.displayName,
          profilePicture:resultFromGoogle.user.photoURL
        })
      })
      const responseData=await response.json();
      if(response.ok){
        dispatch(loginSuccess(responseData));
        showSuccessMessage(responseData.message)
        navigate('/')
        return;
      }
      dispatch(error(responseData.message));
      showErrorMessage(responseData.message);

    } catch (error) {
      dispatch(error(error.message));
      showErrorMessage(error.message);
    }
  }

  return (
    <button
        type="button"
        onClick={handleGoogleClick}
        {...props}
        className="rounded-lg border border-orange-500 hover:bg-orange-500 hover:text-white flex justify-center gap-8 items-center px-2 py-2 my-1 mx-1 w-full"
    >
        <FaGoogle/>
        <span>Continue With Google</span>
    </button>
  )
}
