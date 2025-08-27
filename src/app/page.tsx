"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Tattoo Client
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A modern Next.js application with GraphQL authentication and
            role-based access control.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {!isAuthenticated ? (
              <>
                <div className="rounded-md shadow">
                  <Link href="/auth">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link href="/dashboard">
                    <Button variant="outline" size="lg" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link href="/products">
                    <Button variant="outline" size="lg" className="w-full">
                      Products
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-md shadow">
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
                {user?.role?.name === "admin" && (
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link href="/admin">
                      <Button variant="outline" size="lg" className="w-full">
                        Admin Panel
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Authentication
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Secure login and registration with JWT tokens and GraphQL
                integration.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Role Management
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Role-based access control with protected routes for different
                user levels.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Modern Tech Stack
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Built with Next.js 14, TypeScript, Tailwind CSS, and Apollo
                Client.
              </p>
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <div className="mt-12 text-center">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.firstName || user?.email}!
              </h3>
              {user?.role && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Role:{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {user.role.name}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
