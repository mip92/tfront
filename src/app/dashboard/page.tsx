"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/generated/graphql";

export default function DashboardPage() {
  const { user, logout, isAuthenticated, refreshToken } = useAuth();
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutMutation({
          variables: { refreshToken },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      router.push("/auth");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.firstName || user?.email}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                User Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    User ID:
                  </span>
                  <span className="text-sm text-gray-900">{user?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <span className="text-sm text-gray-900">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    First Name:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user?.firstName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Last Name:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user?.lastName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
