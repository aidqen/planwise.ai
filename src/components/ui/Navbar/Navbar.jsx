'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import NavHeader from '../NavHeader'
import NavLink from '../NavLink'

const Navbar = () => {

    const [state, setState] = useState(false)
    const menuBtnEl = useRef()

    const navigation = [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "FAQs", href: "/#faqs" },
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!menuBtnEl?.current?.contains(target)) setState(false);
        };
    }, [])

    return (
        <header className='relative'>
            <div className="custom-screen md:hidden">
                <NavHeader menuBtnEl={menuBtnEl} state={state} onClick={() => setState(!state)} />
            </div>
            <nav className={`pb-5 md:text-sm md:static md:block ${state ? "absolute inset-x-0 top-0 z-20 bg-gray-900 rounded-b-2xl shadow-xl md:bg-gray-900" : "hidden"}`}>
                <div className="items-center custom-screen md:flex relative">
                    <NavHeader state={state} onClick={() => setState(!state)} />
                    <div className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                        <ul className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                            <li key={idx} className="hover:text-gray-50">
                                                <Link href={item.href} className="block">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        <div className="gap-x-6 justify-end items-center mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 md:ml-auto">
                            <Link href="/auth/login" className="block hover:text-gray-50">
                                Sign in
                            </Link>
                            <NavLink href="/pricing" className="flex gap-x-1 justify-center items-center text-sm font-medium text-white border border-gray-500 custom-btn-bg active:bg-gray-900 md:inline-flex">
                                Start now
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar