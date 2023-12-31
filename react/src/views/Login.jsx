import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login () {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const [errors, setErrors] = useState(null);

    const onSubmit = e => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null);

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    if(response.data.errors) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                }
            })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Login into your account.</h1>
                {errors && (
                    <div>
                        {
                            Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))
                        }
                    </div>
                )}
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button>Login</button>
                <p>Not Registered? <Link to="/signup">Create an account</Link></p>
            </form>
        </div>
    )
}
