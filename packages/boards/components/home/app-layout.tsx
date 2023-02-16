import Image from 'next/image'
import type { ReactNode } from 'react'
import { Show } from 'ui-kit'

type AppLayoutProps = {
  children: ReactNode
  extra?: ReactNode
  workspaceSlug: string
  workspaceName: string
  workspaceLogo: string
}

export default function AppLayout({
  workspaceName,
  workspaceSlug,
  workspaceLogo,
  extra,
  children,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-gray-100">
      <header className="flex items-center justify-between px-6 py-2 mb-2 bg-white border-b">
        <a href={`/${workspaceSlug}`} className="flex items-center space-x-4">
          <Show when={workspaceLogo}>
            {(logo) => (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                alt="Company logo"
                src={logo}
              />
            )}
          </Show>
          <Show when={!workspaceLogo}>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-slate-500">
              <p className="text-xl font-medium text-white">
                {workspaceName.charAt(0).toUpperCase()}
              </p>
            </div>
          </Show>
          <p className="text-xl font-medium ">{workspaceName}</p>
        </a>
        {extra}
      </header>

      {children}

      <footer className="flex items-center justify-center w-full py-4 bg-white">
        <p className="text-sm text-gray-500">
          <span>Copyright © 2023</span>{' '}
          <a
            href="https://www.daybreakhire.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-main"
          >
            Daybreak Hire
          </a>{' '}
          All rights reserved.
        </p>
      </footer>
    </div>
  )
}
