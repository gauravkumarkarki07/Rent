import { useState } from "react";

export default function useInputFileChange() {
    const [image, setImage] = useState(null);

    const handleInputFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const clear = () => {
        setImage(null);
    };

    return [image, handleInputFileChange, clear];
}
