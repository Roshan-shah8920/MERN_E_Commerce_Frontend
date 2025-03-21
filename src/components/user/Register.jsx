import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const {register} = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const {name ,email,password} = formData;
    const submitHandler = async(e)=>{
        e.preventDefault();
       const user = await register (name,email,password)
       if (user.success) {
        navigate("/login")
       }
        // alert("Your Form is Submited")
        console.log(formData);
        
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="p-4 shadow-lg rounded bg-white" style={{ width: "350px" }}>
                <h3 className="text-center mb-4">Register</h3>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input name="name" value={formData.name} onChange={onChangeHandler} type="text" className="form-control" id="fullName" placeholder="Enter your full name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name="email" value={formData.email} onChange={onChangeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name="password" value={formData.password} onChange={onChangeHandler} type="password" className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
