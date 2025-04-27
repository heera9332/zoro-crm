"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "./page-header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Home", slug: "/" },
  { label: "Blogs", slug: "/blogs" },
  { label: "Login", slug: "/login" },
];

function Navbar({ children }) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("/");
  const [activeItemMenu, setActiveItemMenu] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const current = menuItems.find((item) => item.slug === pathname);
    if (current) {
      setActiveItem(current.slug);
      setActiveItemMenu(current.label);
    }
  }, [pathname]);

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    className="size-8"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.slug}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700",
                          activeItem === item.slug ? "bg-gray-900" : ""
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <svg
                      className="block size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.slug}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700",
                      activeItem === item.slug ? "bg-gray-900" : ""
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <PageHeader title={activeItemMenu} />

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
