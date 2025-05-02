// import { Page } from '@/payload-types'
// import { RichText } from '@payloadcms/richtext-lexical/react'
// import Image from 'next/image'

// type Props = {
//   block: Extract<Page['layout'][0], { blockType: 'hero' }>
// }

// function HeroBlock({ block }: Props) {
//   return (
//     <div>
//       <div>{block.heading}</div>
//       <RichText data={block.subheading} />
//       {typeof block.image === 'object' && block.image.url && (
//         <Image src={block.image.url} alt={block.image.alt} width={800} height={600} priority />
//       )}
//     </div>
//   )
// }

// export default HeroBlock

import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type Props = {
  block: Extract<Page['layout'][0], { blockType: 'hero' }>
}

function HeroBlock({ block }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Image with overlay */}
      {typeof block.image === 'object' && block.image.url && (
        <Image
          src={block.image.url}
          alt={block.image.alt}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
          priority
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-md">
          {block.heading}
        </h1>

        <div className="mt-6 max-w-2xl mx-auto text-lg text-slate-200 drop-shadow-sm">
          <RichText data={block.subheading} />
        </div>
      </div>
    </section>
  )
}

export default HeroBlock
