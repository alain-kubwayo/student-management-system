import { Link } from "react-router-dom";

export default function Login () {

    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Login into your account.</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
                <p>Not Registered? <Link to="/signup">Create an account</Link></p>
            </form>
        </div>
    )
}
