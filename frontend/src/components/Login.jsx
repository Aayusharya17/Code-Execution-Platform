import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post("http://localhost:5000/api/v1/user/login", formData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.data.token);
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={submitHandler} className='flex flex-col'>
                <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login ;