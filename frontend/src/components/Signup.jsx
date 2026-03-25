import { useState } from "react";
import axios from "axios"

const Signup = () => {
    const [formData, setFormData ]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const submitHandler = () =>{
        e.preventDefault();
        console.log(formData);
        axios.post("https://localhost:5000/api/v1/user/signup",formData)
        .then(res=>{
            console.log(res);
            localStorage.setItem("token", res.data.data.token);
        })
        .catch(e => {
            console.log(e);
        });
    }
    return (
        <div>   
            <h1>Login Page</h1>
            <form className="flex flex-col" onSubmit={submitHandler}>
                <input type="text" placeholder="Username" value={formData.username} onChange={(e)=>{setFormData({...formData,username : e.target.value})}}/>
                <input type="email" placeholder="Email" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
                <input type="password" placeholder="Enter Your Password" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>
                <input type="password" placeholder="Confirm Your Password" value={formData.confirmPassword} onChange={(e)=>{setFormData({...formData,confirmPassword:e.target.value})}}/>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;