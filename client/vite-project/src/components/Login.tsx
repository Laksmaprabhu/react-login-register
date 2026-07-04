import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
           const response = await axios.post('http://localhost:5000/api/users/login',formData);
           console.log(response.data.data);
           localStorage.setItem("userrole",response.data.data.role);
           localStorage.setItem("token",response.data.token);
           navigate('/dashboard');
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <>
        <div className="heading-section">
            <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
                 <div className="form-group">
                    <input type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} name="email" />
                </div>
                 <div className="form-group">
                    <input type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;