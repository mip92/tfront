"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/generated/graphql";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen bg-muted/50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user?.firstName || user?.email}!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    User ID:
                  </span>
                  <span className="text-sm text-foreground">{user?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Email:
                  </span>
                  <span className="text-sm text-foreground">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    First Name:
                  </span>
                  <span className="text-sm text-foreground">
                    {user?.firstName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Last Name:
                  </span>
                  <span className="text-sm text-foreground">
                    {user?.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Role:
                  </span>
                  <span className="text-sm text-foreground">
                    {user?.role ? (
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {user.role.name}
                        {user.role.description && (
                          <span className="ml-1 text-muted-foreground">
                            - {user.role.description}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        No role assigned
                      </span>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <h4 className="font-medium text-primary">Profile</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    View and edit your profile information
                  </p>
                </div>
                {user?.role?.name === "admin" && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <h4 className="font-medium text-purple-900">Admin Panel</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Access administrative functions
                    </p>
                  </div>
                )}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-900">Settings</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Configure your account settings
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
