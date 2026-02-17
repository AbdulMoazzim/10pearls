import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import type { SignUpData } from '../utils/types';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthColor = (): string => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStrengthText = (): string => {
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-orange-800">
      {/* Animated Background */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white/90  backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200  p-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-gray-600 ">
                  Start your journey with beautiful notes
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />

                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>

                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900  focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200  rounded-full h-2">
                        <div
                          className={`${getStrengthColor()} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1 text-gray-600 ">
                        Password strength: {getStrengthText()}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Creating account...' : (
                    <>
                      Create Account <FiArrowRight />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer Links */}
              <div className="space-y-3 text-center">
                <p className="text-gray-600 ">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-purple-600  font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="text-purple-600  text-sm hover:underline"
                >
                  ← Back to home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};