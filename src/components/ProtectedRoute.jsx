'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.authModule.user); // Replace with your state path
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login'); // Redirect to the auth page if user isn't logged in
    }
  }, [user, navigate]);

  return user ? children : null; // Render children only if user is logged in
}