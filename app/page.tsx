'use client'
import CardUploader from '@/components/card-uploader'
import GithubButton from '@/components/github-btn'
import { ModeToggle } from '@/components/mode-toggle'
import { ReactLenis } from '@studio-freight/react-lenis'
import bg from './app.module.scss'

export default function Home() {
  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <header className="fixed top-0 left-0 w-full z-50 py-3 bg-transparent">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center">
            <div className="flex items-center gap-3">
              <GithubButton />
              <ModeToggle />
            </div>
          </div>
        </header>
        <div
          className="h-screen w-screen fixed top-0 left-0 z-[-1] bg-[radial-gradient(#e0f2fe,#ffffff)]
          dark:bg-[radial-gradient(#021027,#000000)]"
        >
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} className={bg.circleContainer}>
              <div className={bg.circle} />
            </div>
          ))}
        </div>
        <div className="max-w-screen-xl min-h-screen px-4 sm:px-6 lg:px-8 py-14 flex justify-center items-center">
          <CardUploader />
        </div>
      </div>
    </ReactLenis>
  )
}
