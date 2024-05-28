import useToastMessage from "../utils/useToastMessage";
import { useDispatch } from "react-redux";
import { loadingStart,logoutSuccess,error } from "../redux/user/userSlice";

export default function usePostAPI() {

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
                dispatch(logoutSuccess());
                showSuccessMessage(responseData.message);
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
