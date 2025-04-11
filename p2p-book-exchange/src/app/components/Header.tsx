'use client';
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide hover:opacity-90 transition">
          P2P Book Exchange
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink href="/" label="Home" />
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/auth/login" label="Login" />
          <NavLink href="/auth/signup" label="Signup" />
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start bg-blue-700 px-6 py-4 space-y-4 text-lg">
          <NavLink href="/" label="Home" onClick={() => setIsOpen(false)} />
          <NavLink href="/dashboard" label="Dashboard" onClick={() => setIsOpen(false)} />
          <NavLink href="/auth/login" label="Login" onClick={() => setIsOpen(false)} />
          <NavLink href="/auth/signup" label="Signup" onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="hover:text-gray-200 transition duration-200 font-medium"
    >
      {label}
    </Link>
  );
}
