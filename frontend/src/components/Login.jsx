import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, signInWithGoogle } = useAuth();
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Xử lý đăng nhập Email/Password
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    }
  };

  // Xử lý đăng nhập Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Google Login successful!');
      navigate('/');
    } catch (error) {
      alert('Google sign in failed!');
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Email Address"
              className="border rounded w-full py-2 px-3"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Password"
              className="border rounded w-full py-2 px-3"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Thông báo lỗi */}
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          Haven't an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>

        {/* Google Sign In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
