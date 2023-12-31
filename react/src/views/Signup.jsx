import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();


    const onSubmit = e => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Create an account.</h1>
                {errors && (
                    <div>
                        {
                            Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))
                        }
                    </div>
                )}
                <input ref={nameRef} type="text" placeholder="Full Name" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                <button>Signup</button>
                <p>Already Registered? <Link to="/login">Sign in</Link></p>
            </form>
        </div>
    )
}
