import React from 'react'
import './styles.css'
import Header from '@/blocks/global/Header/Server'
import Footer from '@/blocks/global/Footer/Server'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col">
          {/* header */}
          <Header />
          <div className="flex-1">{children}</div>
          {/* header */}
          <Footer />
        </main>
      </body>
    </html>
  )
}
