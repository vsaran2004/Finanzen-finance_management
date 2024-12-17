'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaHome, FaBullseye, FaPiggyBank, FaBell, FaChartLine, FaWallet } from 'react-icons/fa';

const navItems = [
  { href: '/', icon: FaHome, label: 'Home' },
  { href: '/budget', icon: FaBullseye, label: 'Budget' },
  { href: '/expense', icon: FaWallet, label: 'Expense' },
  { href: '/savings', icon: FaPiggyBank, label: 'Savings' },
  { href: '/notifications', icon: FaBell, label: 'Alerts' },
  { href: '/report', icon: FaChartLine, label: 'Reports' },
];

const NavItem = ({ href, icon: Icon, label, isActive }) => (
  <Link href={href} className="w-full">
    <div className={`hover:bg-gray-100 p-3 rounded-xl transition-all duration-200 flex flex-col items-center group w-full ${isActive ? 'bg-gray-100' : ''}`}>
      <Icon className={`text-2xl mb-1 group-hover:scale-110 transition-transform ${isActive ? 'scale-110 text-blue-600' : 'text-gray-600'}`} />
      <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>{label}</span>
    </div>
  </Link>
);

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <header className="hidden md:flex bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 py-6 shadow-md h-full fixed left-0 top-0 w-20 flex-col items-center justify-between">
        <div className="flex flex-col items-center space-y-6">
          <Link href="/" aria-label="Go to homepage">
            <div className="rounded-full bg-white p-2 shadow-md">
              <Image src="/logo-2.png" alt="Finanzen Logo" width={46} height={46} />
            </div>
          </Link>
          <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <nav className="flex flex-col items-center space-y-6 my-8">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} />
          ))}
        </nav>
        <div className="mb-6 w-16 h-1 bg-gray-200 rounded-full"></div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden fixed top-14 left-0 w-full bg-white text-gray-800 z-20 shadow-md">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block py-3 px-4 hover:bg-gray-100">
              <div className="flex items-center">
                <item.icon className={`mr-3 ${pathname === item.href ? 'text-blue-600' : 'text-gray-600'}`} />
                <span className={pathname === item.href ? 'text-blue-600' : 'text-gray-800'}>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      )}

      {/* Mobile Bottom Navigation */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md text-gray-800 flex justify-around items-center py-2">
        {navItems.slice(0, 5).map((item) => (
          <NavItem key={item.href} {...item} isActive={pathname === item.href} />
        ))}
      </footer>
    </>
  );
};

export default Header;

