import { Image } from 'antd'
import { ReactElement } from 'react'
import { Show } from 'ui-kit'

type AppLayoutProps = {
  children: ReactElement
  workspaceName: string
  workspaceLogo: string
}

export default function AppLayout({
  workspaceName,
  workspaceLogo,
  children,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-gray-100">
      <header className="flex items-center px-5 mb-2 space-x-4 bg-white border-b shadow-md">
        <Show when={workspaceLogo}>
          {(logo) => (
            <Image
              width={32}
              height={32}
              className="rounded-full"
              alt="Company logo"
              src={logo}
            />
          )}
        </Show>
        <Show when={!workspaceLogo}>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500">
            <p className="text-xl font-medium text-white">
              {workspaceName.charAt(0).toUpperCase()}
            </p>
          </div>
        </Show>
        <p className="text-xl font-medium ">{workspaceName}</p>
      </header>
      {children}
    </div>
  )
}
