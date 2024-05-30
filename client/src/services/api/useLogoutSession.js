import useToastMessage from "../utils/useToastMessage";
import { useDispatch } from "react-redux";
import { loadingStart,logoutSuccess,error } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function usePostAPI() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [showSuccessMessage, showErrorMessage ] = useToastMessage();

    const post = async () => {
        dispatch(loadingStart());
        try {
            const response = await fetch('/api/user/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                dispatch(logoutSuccess(responseData.message));
                showSuccessMessage(responseData.message);
                navigate('/login')
                return
            } else {
                dispatch(error(responseData.message))
                showErrorMessage(responseData.message);
            }
        } catch (error) {
            dispatch(error(error.message))
            showErrorMessage(error.message);
        }
    };

    return [post];
}
