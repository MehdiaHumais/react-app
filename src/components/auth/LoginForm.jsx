import React, { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { login as apiLogin } from '../../services/api';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user, loading } = useAuth(); // Get user and loading state

  // Check if user is already logged in when this component mounts
  useEffect(() => {
    console.log("LoginForm: Mounted. Current user from context:", user, "Loading:", loading); // Debug log
    if (user) {
      console.log("LoginForm: User already exists in context, redirecting..."); // Debug log
      if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/buildings');
      }
    }
  }, [user, loading, navigate]); // Add dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LoginForm: Submitting login request for:", username); // Debug log
    try {
      const userData = await apiLogin(username, password);
      console.log("LoginForm: API login successful, received user data:", userData); // Debug log
      login(userData); // This calls the login function in AuthContext
      // Navigation handled by login function in AuthContext
    } catch (err) {
      console.error("LoginForm: Login error:", err.message); // Debug log
      setError(err.message);
    }
  };

  // If user is already logged in (or was just set by useEffect), show loading or redirect
  if (user) {
    console.log("LoginForm: User exists, showing redirect message..."); // Debug log
    return <div className="text-center mt-10">Redirecting...</div>;
  }

  // If still loading context, show loading
  if (loading) {
    console.log("LoginForm: Context still loading..."); // Debug log
    return <div className="text-center mt-10">Loading...</div>;
  }

  console.log("LoginForm: Rendering login form."); // Debug log
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
      <div className="flex justify-center items-center mb-8">
        {/* Updated SVG to better match the logo */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
          <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#00C2B8"/>
          <path d="M15 18L26 24L15 30" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M33 18H29" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="text-left">
          <h2 className="text-3xl font-bold text-white tracking-wider">RALLY</h2>
          <p className="text-3xl font-bold text-primary tracking-wider">TV</p>
        </div>
      </div>

      {error && <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username or email"
          required
          className="input-mockup"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="input-mockup"
        />
        <Button type="submit" className="btn-mockup w-full mt-4">Login</Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <a href="#" className="text-primary hover:underline">Forgot Password?</a>
      </div>
      <div className="mt-2 text-center text-sm">
        Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;