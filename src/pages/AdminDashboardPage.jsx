import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import BottomNav from '../components/ui/BottomNav';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  if (user?.role !== 'Admin') {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto relative">
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>

        <div className="w-full max-w-md text-center mx-auto pt-8">
          <h1 className="text-3xl font-bold text-primary mb-8">ADMIN DASHBOARD</h1>

          <div className="space-y-4">
            <Link to="/admin/buildings" className="btn-mockup block text-lg">
              MANAGE BUILDING
            </Link>
            <Link to="/admin/users" className="btn-mockup block text-lg">
              MANAGE USERS
            </Link>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AdminDashboardPage;