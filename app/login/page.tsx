'use client';

import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function LoginPage() {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <SignIn routing="hash"
            appearance={{
              baseTheme: isDarkTheme ? dark : undefined,
              elements: {
                footer: "hidden",
                logoBox: "hidden",
                logoImage: "hidden",
                card: "shadow-none",
                headerTitle: "text-2xl font-bold text-center text-gray-800 dark:text-white",
                headerSubtitle: "text-center text-gray-600 dark:text-gray-400",
              }
            }}
          />
        </div>
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
