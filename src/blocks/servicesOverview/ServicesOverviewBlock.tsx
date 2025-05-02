import React from 'react'
import Image from 'next/image'
import { Page } from '@/payload-types'

type Props = {
  block: Extract<Page['layout'][0], { blockType: 'services-overview' }>
}

function ServicesOverviewBlock({ block }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">{block.heading}</h2>
        {block.description && (
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">{block.description}</p>
        )}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {block.services?.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition flex flex-col items-center text-center"
            >
              {/* Render uploaded image */}
              {typeof service.image === 'object' && service.image?.url && (
                <Image
                  src={service.image.url}
                  alt={service.image.alt || service.title}
                  width={80}
                  height={80}
                  className="mb-4 rounded-md object-contain"
                />
              )}

              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverviewBlock
