import { useState } from "react";
import useToastMessage from "../utils/useToastMessage";

export default function usePostAPI(url, data) {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const [showSuccessMessage, showErrorMessage ] = useToastMessage();

    const post = async () => {
        setResponseData(null);
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (response.ok) {
                setResponseData(responseData);
                showSuccessMessage(responseData.message);
                return responseData;
            } else {
                console.log(responseData)
                setError(responseData.message);
                showErrorMessage(responseData.message);
            }
        } catch (error) {
            console.log(error)
            setError(error.message);
            showErrorMessage(error.message);
        }
    };

    return [post, responseData, error];
}
