'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SignUpForm from './_components/Form'

export default function SignUpPage() {
  const bannerImages = [
    '/images/login/banner-1.jpeg',
    '/images/login/banner-2.jpeg'
  ]

  const [randomBanner, setRandomBanner] = useState<string | null>(null)

  useEffect(() => {
    const index = Math.floor(Math.random() * bannerImages.length)
    setRandomBanner(bannerImages[index])
  }, [])

  return (
    <section className="grid min-h-screen grid-cols-[1fr] lg:grid-cols-[580px_1fr] xl:[680px_1fr] p-8 relative max-w-[1980px] mx-auto">
      <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-20">
            <Link href="/" className='flex gap-1 items-center font-semibold justify-start'>
              <ArrowLeft className="inline-block pb-2 font-semibold -mb-2" />
              Voltar
            </Link>
          </div>
          <Image src="/images/houser/houser.png" width={140} height={140} alt="Houser. Presente, precisa e inteligente." />
          <div className="mt-10">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block w-full h-full">
        {randomBanner && (
          <Image
            src={randomBanner}
            layout="fill"
            className="absolute inset-0 size-full object-cover rounded-lg"
            alt="Legionari"
            quality={100}
            priority
          />
        )}
      </div>
    </section>
  )
}
