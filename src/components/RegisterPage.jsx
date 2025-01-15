import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setValidationError('');
  };

  const validateForm = () => {
    if (!formData.username) {
      setValidationError('Username is required');
      return false;
    }
    if (!formData.email) {
      setValidationError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setValidationError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      setValidationError('You must agree to the Terms of Service');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        username: formData.username
      });

      if (!error) {
        navigate('/');
      }
    } catch (err) {
      setValidationError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 card">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-gray-400">Join the Division Builds community</p>
        </div>

        {(authError || validationError) && (
          <div className="p-4 text-red-500 bg-red-500/10 rounded-lg">
            {authError || validationError}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-600 bg-division-dark-lighter text-division-orange focus:ring-division-orange"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-division-orange hover:text-division-orange/80">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-division-orange hover:text-division-orange/80">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Create account'
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-division-orange hover:text-division-orange/80">
                Sign in
              </Link>
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-division-dark text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="btn-secondary flex items-center justify-center"
              onClick={() => {/* TODO: Implement Discord OAuth */}}
            >
              Discord
            </button>
            <button
              type="button"
              className="btn-secondary flex items-center justify-center"
              onClick={() => {/* TODO: Implement Google OAuth */}}
            >
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 