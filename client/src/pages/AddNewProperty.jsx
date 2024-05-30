import Button from "../components/Button";
import InputField from "../components/InputField";
import useInputChange from "../customHooks/useInputChange";
import InputFile from '../components/InputFile.jsx';
import useInputFileChange from "../customHooks/useInputFileChange.js";
import useImageUploadFirebase from "../services/api/useImageUploadFirebase.js";
import { useSelector } from 'react-redux';
import useToastMessage from "../services/utils/useToastMessage.js";
import usePostAPI from '../services/api/usePostAPI.js';

export default function AddNewProperty() {
    const session = useSelector(state => state.user.session);

    const[showSuccessMessage,showErrorMessage]=useToastMessage();

    const initialFormState = {
        address: '',
        title: '',
        description: '',
        bedroom: '',
        bathroom: '',
        propertyType: '',
        price: '',
        userId: session.session._id,
        propertyImage: ''
    };

    const [formData, handleInputChange] = useInputChange(initialFormState);
    const [image, handleInputFileChange] = useInputFileChange();
    const [uploadFileToFireBase] = useImageUploadFirebase({ image, session, folderName: 'propertyImage' });
    const [post]=usePostAPI('/api/user/addproperty',formData);

    const saveImage = async (e) => {
        e.preventDefault();
        const imageFirebaseUrl = await uploadFileToFireBase();
        if (imageFirebaseUrl) {
            await handleInputChange({ target: { name: 'propertyImage', value: imageFirebaseUrl } });
        } else {
            showErrorMessage('Image upload failed or no image selected.');
            throw "Error"
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.propertyImage) {
                return showErrorMessage('Save the image first')
            }
            await post();
        } catch (error) {
            showErrorMessage(error.message)
        }

    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1>List Your Property For Rent</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[50%]">
                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="px-2 py-2">Title</label>
                        <InputField
                            type='text'
                            name='title'
                            placeholder='Title'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="px-2 py-2">Description</label>
                    <InputField
                        type='text'
                        name='description'
                        placeholder='write a short description'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="px-2 py-2">BedRoom</label>
                        <InputField
                            type='number'
                            name='bedroom'
                            placeholder='number of bedrooms'
                            value={formData.bedroom}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className="px-2 py-2">BathRoom</label>
                        <InputField
                            type='number'
                            name='bathroom'
                            placeholder='number of bathrooms'
                            value={formData.bathroom}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                            <label className="px-2 py-2">Price</label>
                            <InputField
                                type='number'
                                name='price'
                                placeholder='$'
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="w-full">
                            <label className="px-2 py-2">Property Type</label>
                            <InputField
                                type='text'
                                name='propertyType'
                                placeholder='(apartment, house, unit)'
                                value={formData.propertyType}
                                onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div>
                    <label className="px-2 py-2">Address</label>
                    <InputField
                        type='text'
                        name='address'
                        placeholder='property address'
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="px-2 py-2">Property Images</label>
                        <InputFile
                            type='file'
                            name='propertyImage'
                            accept='image/*'
                            onChange={handleInputFileChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className="px-2 py-2">Save Image</label>
                        <Button
                            variant='primary'
                            type='button'
                            action={saveImage}
                        >
                            Save Image
                        </Button>
                    </div>
                </div>
                {image && <img src={URL.createObjectURL(image)} className="w-28 h-20"/>}
                <div>
                    <Button variant='secondary' type='submit'>
                        List Property
                    </Button>
                </div>
            </form>
        </div>
    );
}
