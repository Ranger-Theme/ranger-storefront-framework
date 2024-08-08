import type { FC, ReactNode } from 'react'
import React from 'react'
import { usePwaInstall } from '@ranger-theme/hooks'

export interface InstallTriggerProps {
  children: ReactNode
}

const InstallTrigger: FC<InstallTriggerProps> = ({ children }) => {
  const { isInstalled, isVisible, handleOnClick } = usePwaInstall()

  if (isInstalled) return null

  return (
    <>
      {isVisible && (
        <>
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child, { onClick: handleOnClick })
          )}
        </>
      )}
    </>
  )
}

export default InstallTrigger
