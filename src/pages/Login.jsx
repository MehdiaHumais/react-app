import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PasswordInput from '../components/ui/PasswordInput';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'Admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/buildings', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = await apiLogin(username, password);
      login(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">


        <h1 className="text-white text-2xl text-center font-bold mb-6">Log in</h1>

        {error && <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username or email"
            required
            className="input-mockup"
          />
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            className="input-mockup"
          />
          <Button
            type="submit"
            className="btn-mockup"
          >
            Log in
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-primary hover:underline">Forgot Password?</a>
        </div>
        <div className="mt-2 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;