'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import Image from 'next/image'
import { useState } from 'react'


const Navbar = () => {

    const { data: session } = useSession()
    const user: User = session?.user as User
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="p-2 md:p-3 shadow-md bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/anonymous.svg" alt="Logo" width={70} height={70} priority />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Items */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:items-center`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {session ? (
              <>
                <li>
                  <span className="mr-4 bg-pink-800 hover:bg-pink-600 text-white px-4 text-sm py-[9px] rounded">
                    Welcome, {user?.username || user?.email}
                  </span>
                </li>
                <li>
                  <Button className="w-full md:w-auto" onClick={() => signOut()}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/" className="mr-4 bg-pink-800 hover:bg-pink-600 text-white px-4 text-sm py-[9px] rounded">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in">
                    <Button className="w-full md:w-auto">Sign in</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
