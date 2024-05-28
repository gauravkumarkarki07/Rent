import { useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import OAuthButton from "../components/OAuthButton";
import useInputChange from "../customHooks/useInputChange";
import usePostAPI from "../services/api/usePostAPI";
import { useDispatch } from 'react-redux';
import { loginSuccess, success, error as setError } from '../services/redux/user/userSlice.js';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialFormState = useMemo(() => ({
        usernameOrEmail: '',
        password: '',
    }), []);

    const [formData, handleInputChange, clearInputField] = useInputChange(initialFormState);
    const [post, responseData, errorData] = usePostAPI('/api/auth/login', formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await post();
    };

    useEffect(() => {
        if (responseData) {
            dispatch(success(responseData));
            dispatch(loginSuccess(responseData));
            clearInputField(initialFormState);
            navigate('/');
        } else if (errorData) {
            dispatch(setError(errorData));
            clearInputField(initialFormState);
        }
    }, [responseData, errorData, dispatch, navigate, clearInputField, initialFormState]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1>Login With Your Account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[50%]">
                <div>
                    <label className="px-2 py-2">Username/Email</label>
                    <InputField 
                        type='text' 
                        name='usernameOrEmail' 
                        placeholder='Username or Email' 
                        onChange={handleInputChange}
                        value={formData.usernameOrEmail}
                    />
                </div>
                <div>
                    <label className="px-2 py-2">Password</label>
                    <InputField 
                        type='password' 
                        name='password' 
                        placeholder='Password'
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </div>
                <div>
                    <Button variant='secondary' type='submit'>
                        Login
                    </Button>
                    <OAuthButton />
                </div>
            </form>
            <div>
                <span>Create an Account?</span>
                <Link to="/signup" className="hover:underline text-blue-500 px-2">
                    <span>SignUp</span>
                </Link>
            </div>
        </div>
    );
}
