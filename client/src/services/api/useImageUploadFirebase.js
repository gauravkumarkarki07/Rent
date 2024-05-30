import { firebaseApp } from "../firebase.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import useToastMessage from "../utils/useToastMessage.js";

export default function useImageUploadFirebase({ image, session, folderName }) {
    const [showSuccessMessage, showErrorMessage] = useToastMessage();

    const uploadFileToFireBase = async () => {
        if (!image) {
            showErrorMessage("No image file provided for upload.");
            return null;
        }

        try {
            const storage = getStorage(firebaseApp);
            const fileName = image.name;
            const storageUrl = ref(storage, `${session.session._id}/${folderName}/${fileName}`);
            const snapshot = await uploadBytes(storageUrl, image);
            const url = await getDownloadURL(snapshot.ref);
            showSuccessMessage('Uploaded to Firebase');
            return url;
        } catch (error) {
            showErrorMessage(error.message);
            return null;
        }
    }

    return [uploadFileToFireBase];
}
