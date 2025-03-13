'use client'

import { cn } from '@/lib/utils'
import { useAppSelector, selectSidebarCollapsed, useAppDispatch, collapseSidebar, expandSidebar } from '../../../store/index';
import { useEffect } from 'react';

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const collapsed = useAppSelector(selectSidebarCollapsed)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 20
      if (e.clientX <= threshold) {
        dispatch(expandSidebar())
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [dispatch])

  return (
    <aside
      onMouseLeave={() => dispatch(collapseSidebar())}
      className={cn(
        'flex left-0 fixed flex-col w-[70px] lg:w-60 h-full bg-background border-r transition-transform duration-300 z-50 rounded-2xl dark:bg-zinc-900',
        collapsed && ' -translate-x-full transition-transform duration-300',
      )}
    >
      {children}
    </aside>
  )
}