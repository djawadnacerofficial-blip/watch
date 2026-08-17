import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/authApi";

export default function Login() {
    const [loginId, setLoginId] = useState("")
    const [loginPass, setLoginPass] = useState("")

    const [regUsername, setRegUsername] = useState("")
    const [regEmail, setRegEmail] = useState("")
    const [regPass, setRegPass] = useState("")
    const navigate = useNavigate()
    
    async function loginHandler(e) {
        e.preventDefault()
        try {
            
            console.log("from log in" ,await login(loginId, loginPass))
            navigate("/profile")

        } catch (error) {
            console.error(error)
        }
    }

    async function regHandler(e) {
        e.preventDefault()

        try {
            const user = {
                username: regUsername,
                email: regEmail,
                password: regPass
            }
            console.log("from reg", await signup(user))
            navigate("/profile")
            
        } catch (error) {
            console.error(error)
        }

    }

    console.log(loginId, loginPass)

return (

    <section className="login-sec">
        <form onSubmit={loginHandler} className="card">
            <input onChange={(e) => setLoginId(e.target.value)}
            className="id-input" type="text" placeholder="identifier"/>
            <input  onChange={(e) => setLoginPass(e.target.value)} className="pass-input" type="password" placeholder="password"/>
            <button 
            type={"submit"}
            >Log in!</button>
        </form>

        <form onSubmit={regHandler} className="card">
            <input onChange={(e) => setRegUsername(e.target.value)} type="text"  placeholder="username"/>
            <input onChange={(e) => setRegEmail(e.target.value)} type="email" placeholder="email"/>
            <input onChange={(e) => setRegPass(e.target.value)} type="password" placeholder="password"/>
            <button type="submit">Sign Up!</button>
        </form>

    </section>

)
}