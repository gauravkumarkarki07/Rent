import { useState } from "react";
import useToastMessage from "../utils/useToastMessage";

export default function usePostAPI(url) {
    const [responseData, setResponseData] = useState({});

    const [showSuccessMessage, showErrorMessage ] = useToastMessage();

    const get = async () => {
        setResponseData(null);
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                setResponseData(responseData);
                showSuccessMessage(responseData.message);
                return responseData;
            } else {
                console.log(responseData)
                showErrorMessage(responseData.message);
            }
        } catch (error) {
            console.log(error)
            showErrorMessage(error.message);
        }
    };

    return [get, responseData];
}
