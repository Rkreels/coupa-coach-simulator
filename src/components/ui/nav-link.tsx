
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export const NavLink = ({ href, isActive, children }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      {children}
    </Link>
  );
};
