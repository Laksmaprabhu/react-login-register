import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
    }))
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        try{
            axios.post('http://localhost:5000/api/users/add',formData);
            setFormData({
                name:'',
                email:'',
                password:'',
                role:''
            });
            Swal.fire({
                title:"Success!",
                text:"User registered successfully",
                icon:"success",
                timer: 2000,
                showConfirmButton: false,
            });
        }
        catch(err){
            console.log(err);
        }
    }
     
    return(
        <>
        <div className="register-section">
            <div className="heading-section">
                <h1>Register</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} name="name" />
                </div>
                 <div className="form-group">
                    <input type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} name="email" />
                </div>
                 <div className="form-group">
                    <input type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} name="password" />
                </div>
                <div className="form-group">
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                        <option value="contractor">Contractor</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to="/users">View registered users</Link>
            <div className="login-page-link">
                <Link to="/login">Login</Link>
            </div>
        </div>
        </>
    )
}
export default Register;