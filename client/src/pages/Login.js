import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';  // Use 'useNavigate' instead of 'useHistory'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      // Debugging: Check the response data
      console.log("Login response:", data);
  
      if (!data.user) {
        throw new Error("User data missing from response");
      }
  
      // ✅ Store JWT token and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      // Redirect to home page
      navigate("/");
      window.location.reload(); 
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };
  
  

  return (
    <div>
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-center text-4xl font-bold text-accent mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Login
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-accent text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary text-accent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-accent text-lg font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary text-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-primary rounded-lg hover:bg-secondary transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-accent">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary font-medium hover:text-primary transition duration-300">
                Sign Up
              </Link>
            </p>
            <p className="text-sm text-accent mt-2">
              <Link to="/forgot-password" className="text-secondary font-medium hover:text-primary transition duration-300">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
