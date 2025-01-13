'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import Image from 'next/image'


const Navbar = () => {

    const { data: session } = useSession()
    const user: User = session?.user as User

    return (
        <nav className='p-2 md:p-3 shadow-md'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a href="#" id="">
                    <Image src='/anonymous.svg' alt='Logo' width={70} height={70} priority/>
                </a>
                {
                    session ? (
                        <>
                            <span className='mr-4 bg-pink-800 hover:bg-pink-600 text-white px-3 py-1 rounded'>Welcome, {user?.username || user?.email}</span>
                            <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <>
                        <Link href='/'>
                        <span className='mr-4 bg-pink-800 hover:bg-pink-600 text-white px-3 py-1 rounded'>Home</span>
                        </Link>
                        <Link href='/sign-in'>
                            <Button className='w-full md:w-auto'>Sign in</Button>
                        </Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
