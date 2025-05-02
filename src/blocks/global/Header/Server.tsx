import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Navbar from '@/components/Navbar'

async function Header() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const header = await payload.findGlobal({
    slug: 'header',
  })

  console.log(header)

  // Safely resolve the logo
  const logoMedia = typeof header.logo === 'object' && header.logo !== null ? header.logo : null

  return (
    <Navbar
      logo={{
        url: logoMedia?.url || '/fallback-logo.png',
        alt: logoMedia?.alt || 'Logo',
      }}
      nav={
        (header.nav || []).map((item: any) => ({
          label: item.label,
          link: item.link,
        })) ?? []
      }
    />
  )
}

export default Header
