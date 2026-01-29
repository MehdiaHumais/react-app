import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser as apiRegisterUser } from '../services/api';
import { isValidPassword, validateEmailWithSuggestions } from '../utils/helpers';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PasswordInput from '../components/ui/PasswordInput';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Technician'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email format
    const emailValidation = validateEmailWithSuggestions(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
      return;
    }

    try {
      const userData = { username, email, password, role };
      const sessionData = await apiRegisterUser(userData);

      if (sessionData && sessionData.session) {
        setSuccess('Registration successful! Logging you in...');
        await login(sessionData.user); 
      } else {
        setSuccess('Registration successful! Please check your email to confirm your account.');
        setTimeout(() => {
          navigate('/'); // Redirect to login page
        }, 3000);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-2xl text-center font-bold mb-6">Register</h1>

        {error && <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-center">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="input-mockup"
          />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-mockup"
          />
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-mockup"
          />
          <div>
            <label htmlFor="role" className="block text-gray-400 text-sm font-bold mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-mockup w-full"
            >
              <option value="Technician" className="bg-dark text-white">Field Technician</option>
              <option value="Admin" className="bg-dark text-white">Admin</option>
            </select>
          </div>
          <Button
            type="submit"
            className="btn-mockup"
          >
            Register
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link to="/" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;