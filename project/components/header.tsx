'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { AuthModal } from './auth-modal';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export function Header() {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              KidStore
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Shop All
              </Link>
              <Link href="/products?category=Toys" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Toys
              </Link>
              <Link href="/products?category=Educational" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Educational
              </Link>
              <Link href="/products?category=Baby Care" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Baby Care
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>

              {user ? (
                <>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              ) : (
                <Button onClick={() => setAuthModalOpen(true)} size="sm">
                  Sign In
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-2 border-t">
              <Link
                href="/products"
                className="block py-2 text-sm font-medium hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                href="/products?category=Toys"
                className="block py-2 text-sm font-medium hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Toys
              </Link>
              <Link
                href="/products?category=Educational"
                className="block py-2 text-sm font-medium hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Educational
              </Link>
              <Link
                href="/products?category=Baby Care"
                className="block py-2 text-sm font-medium hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Baby Care
              </Link>
              {user && (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium text-red-600"
                >
                  Sign Out
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
