'use client'
import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

const links = [
  {
    label: `Features`,
    href: `/`,
  },
  {
    label: `Testimonials`,
    href: `/`,
  },
  {
    label: `Pricing`,
    href: `/`,
  },
];

const secondaryLinks = [
  {
    label: `Contact Us`,
    href: `/`,
  },
  {
    label: `Log in`,
    href: `/`,
  },

];

export const MenuButton = ({ toggleMenu, showMenu }) => (
  <button
    type="button"
    aria-controls="mobile-menu"
    aria-expanded={showMenu}
    onClick={toggleMenu}
    className="p-2 text-gray-400"
  >
    <span className="sr-only">Open menu</span>
    {showMenu ? (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
);

const MobileMenu = () => (
  <div className="md:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {links.map((link) => (
        <a href={link.href} className="block px-3 py-2 text-base font-medium text-gray-500" key={link.label}>
          {link.label}
        </a>
      ))}
    </div>
    <div className="pt-4 pb-3 border-t border-gray-400">
      <div className="px-2 space-y-1">
        {secondaryLinks.map((link) => (
          <a
            key={`mobile-${link.label}`}
            href={link.href}
            className="block px-3 py-2 text-base font-medium text-gray-500"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image className="w-12 h-12" src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png" alt="logo" width={48} height={48} />
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 font-medium text-gray-500 rounded-md hover:text-gray-600"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <Button variant="ghost" className="mr-2">Contact sales</Button>
              <Button variant="ghost" className="mr-2">Log in</Button>
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <MenuButton showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      {showMenu ? <MobileMenu /> : null}
    </nav>
  );
};

