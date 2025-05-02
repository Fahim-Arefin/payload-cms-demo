// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// type Props = {
//   logo: {
//     url: string
//     alt: string
//   }
//   nav: {
//     label: string
//     link: string
//   }[]
// }

// function Navbar({ logo, nav }: Props) {
//   return (
//     <header className="w-full border-b bg-white shadow-sm">
//       <div className="mx-auto flex items-center justify-between py-4 px-4 lg:px-20">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Link href="/">
//             <Image
//               src={logo.url}
//               alt={logo.alt}
//               width={10}
//               height={40}
//               className="h-[70px] w-[150px] lg:w-[300px] object-contain"
//             />
//           </Link>
//         </div>

//         {/* Navigation */}
//         <nav className="hidden gap-6 md:flex">
//           {nav.map((item, idx) => (
//             <Link
//               key={idx}
//               href={item.link}
//               className="text-gray-700 hover:text-black transition-colors"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Nav (optional hamburger - simple version) */}
//         <div className="md:hidden">
//           {/* In a real app, replace with actual drawer/hamburger toggle */}
//           <button className="text-gray-700 text-2xl">☰</button>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  logo: {
    url: string
    alt: string
  }
  nav: {
    label: string
    link: string
  }[]
}

function Navbar({ logo, nav }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white shadow-sm relative z-50">
      <div className="mx-auto flex items-center justify-between py-4 px-4 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo.url}
              alt={logo.alt}
              width={150}
              height={70}
              className="h-[70px] w-[150px] lg:w-[300px] object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden gap-6 md:flex">
          {nav.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white p-6 flex flex-col gap-6 md:hidden z-50">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl self-end text-gray-700"
          >
            ✕
          </button>
          {nav.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="text-gray-700 text-lg hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
