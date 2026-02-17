// src/pages/LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiZap, FiEdit3, FiArrowRight } from 'react-icons/fi';
import { Button } from '../components/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiLock className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your notes are encrypted and accessible only to you. Industry-standard security keeps your thoughts safe.',
    },
    {
      icon: <FiEdit3 className="w-6 h-6" />,
      title: 'Rich Text Editor',
      description: 'Format your notes with a powerful editor. Bold, italics, lists, and more to express yourself fully.',
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Instant sync across devices. No lag, no waiting. Your notes are always ready when you are.',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white ">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Navbar */}
      <nav className="sticky top-0 z-10 backdrop-blur-lg bg-white/80  border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              NotesApp
            </h1>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="gradient" onClick={() => navigate('/signup')}>
                Get Started <FiArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
        <div className="text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Capture Your Thoughts,{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Beautifully
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600  max-w-3xl mx-auto">
            A modern, elegant notes app with rich text editing, secure authentication,
            and a delightful user experience. Your thoughts deserve better.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gradient" size="lg" onClick={() => navigate('/signup')}>
              Start Writing <FiArrowRight />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-gray-900 ">
            Everything You Need
          </h3>
          <p className="text-xl text-gray-600 ">
            Powerful features wrapped in a beautiful interface
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white  p-8 rounded-2xl shadow-xl border border-gray-200  hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-900 ">
                {feature.title}
              </h4>
              <p className="text-gray-600 ">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-1 bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust NotesApp with their thoughts
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/signup')}
            className=" m-auto"
          >
            Create Free Account <FiArrowRight />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-1 bg-gray-900 text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-400">
            © 2026 NotesApp. Made with ❤️ for note-takers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};