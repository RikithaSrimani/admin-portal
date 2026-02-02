import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
const [form, setForm] = useState({
    email: "",
    password: "",
});
const [error, setError] = useState(null);
const {setAuth} = useAuth();
const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/api/auth/login", form, {withCredentials: true});
        setAuth({accessToken: res.data.accessToken, role: res.data.role});
        console.log(res.data);
        navigate("/");
    }
    catch (error) {
        setError("Login failed. Please check your credentials");
        console.error(error);
    }
}

    return <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-2xl font-bold mb-4">{error}</p>}
        <form className="space-y-4">
            <div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={(e) => setForm({...form, email: e.target.value})} 
                    className="w-full p-2 border rounded" 
                    required 
                    />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={(e) => setForm({...form, password: e.target.value})} 
                    className="w-full p-2 border rounded" 
                    required 
                    />
            </div>
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Login
            </button>
        </form>
    </div>;
};

export default Login;