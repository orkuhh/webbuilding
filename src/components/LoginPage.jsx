import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInput from './AuthInput';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Handle login logic
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-division-orange mb-2">Welcome Back, Agent</h1>
          <p className="text-division-light/60">
            Sign in to access your builds and inventory
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-division-orange/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AuthInput
              label="Email Address"
              type="email"
              placeholder="agent@shdtech.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <AuthInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-division-light/60">
                <input type="checkbox" className="mr-2 rounded border-division-orange/20 bg-black/50" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-division-orange hover:text-division-orange/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-division-orange text-black py-2 rounded font-medium hover:bg-division-orange/90 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-division-light/60">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-division-orange hover:text-division-orange/80 transition-colors">
              Create one now
            </Link>
          </div>
        </div>

        {/* OAuth Options */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-division-orange/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-division-light/40">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {['Discord', 'Google', 'GitHub'].map((provider) => (
              <button
                key={provider}
                type="button"
                className="flex justify-center items-center px-4 py-2 border border-division-orange/10 rounded bg-black/40 hover:bg-black/60 transition-colors"
              >
                <span className="text-division-light/80 text-sm">{provider}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 