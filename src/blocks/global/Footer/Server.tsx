import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'

async function Footer() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const footer = await payload.findGlobal({
    slug: 'footer',
  })

  const logo = typeof footer.logo === 'object' && footer.logo !== null ? footer.logo : null

  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0 bg-white">
          {logo?.url && (
            <Image
              src={logo.url}
              alt={logo.alt || 'Footer Logo'}
              width={200}
              height={80}
              className="object-contain"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-300">
          {footer.nav?.map((item: any) => (
            <Link
              key={item.id}
              href={item.link}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">{footer.copyrightNotice}</div>
    </footer>
  )
}

export default Footer
