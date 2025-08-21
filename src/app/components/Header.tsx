// src/app/components/Header.tsx
'use client';

import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              ScholarSumm
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/how-it-works" 
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                How it works
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/examples" 
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Examples
              </Link>
              <Link 
                href="/help" 
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Help
              </Link>
              
              {/* Auth Section */}
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">
                        Hello, {user.firstName || user.emailAddresses[0].emailAddress}
                      </span>
                      <button 
                        onClick={() => signOut()}
                        className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
                        title="Sign out"
                      >
                        {user.firstName?.[0] || 'U'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Link 
                        href="/sign-in"
                        className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link 
                        href="/sign-up"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-600 hover:text-indigo-600 transition-colors p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <Link 
            href="/how-it-works" 
            className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How it works
          </Link>
          <Link 
            href="/pricing" 
            className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            href="/examples" 
            className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Examples
          </Link>
          <Link 
            href="/help" 
            className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </Link>
          
          {/* Mobile Auth */}
          {isLoaded && (
            <>
              {isSignedIn ? (
                <div className="px-3 py-2 border-t">
                  <div className="flex items-center space-x-3 mb-3">
                    <button 
                      onClick={() => signOut()}
                      className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center"
                    >
                      {user.firstName?.[0] || 'U'}
                    </button>
                    <span className="text-sm text-gray-600">
                      {user.firstName || user.emailAddresses[0].emailAddress}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 border-t pt-2">
                  <Link 
                    href="/sign-in"
                    className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/sign-up"
                    className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-indigo-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}