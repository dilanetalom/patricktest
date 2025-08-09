import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const { user, token } = useSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to="/" />;
}