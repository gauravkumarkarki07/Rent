import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { success, error as setError } from "../services/redux/user/userSlice";
import Button from "../components/Button";
import InputField from "../components/InputField";
import OAuthButton from "../components/OAuthButton";
import useInputChange from "../customHooks/useInputChange";
import usePostAPI from "../services/api/usePostAPI";

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialFormState = useMemo(() => ({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        address: '',
        phonenumber: '',
    }), []);

    const [formData, handleInputChange, clearInputField] = useInputChange(initialFormState);
    const [post, responseData, errorData] = usePostAPI('/api/auth/signup', formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await post();
    };

    useEffect(() => {
        if (responseData) {
            dispatch(success(responseData));
            clearInputField(initialFormState);
            navigate('/login');
        } else if (errorData) {
            dispatch(setError(errorData));
            clearInputField(initialFormState);
        }
    }, [responseData, errorData, dispatch, navigate, clearInputField, initialFormState]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1>Create Your Account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[50%]">
                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="px-2 py-2">First Name</label>
                        <InputField 
                            type='text' 
                            name='firstname' 
                            placeholder='firstname'
                            value={formData.firstname} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className="px-2 py-2">Last Name</label>
                        <InputField 
                            type='text' 
                            name='lastname' 
                            placeholder='lastname'
                            value={formData.lastname} 
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="px-2 py-2">Phone Number</label>
                        <InputField 
                            type='number'
                            name='phonenumber' 
                            placeholder='Phone Number'
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label className="px-2 py-2">Address</label>
                        <InputField 
                            type='text' 
                            name='address' 
                            placeholder='address'
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="px-2 py-2">Username</label>
                    <InputField 
                        type='text' 
                        name='username' 
                        placeholder='username'
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="px-2 py-2">Email</label>
                    <InputField 
                        type='email' 
                        name='email' 
                        placeholder='your@example.com'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="px-2 py-2">Password</label>
                    <InputField 
                        type='password' 
                        name='password' 
                        placeholder='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Button variant='secondary' type='submit'>
                        Sign Up
                    </Button>
                    <OAuthButton />
                </div>
            </form>
            <div>
                <span>Already have an Account?</span>
                <Link to="/login" className="hover:underline text-blue-500 px-2">
                    <span>Login</span>
                </Link>
            </div>
        </div>
    );
}
