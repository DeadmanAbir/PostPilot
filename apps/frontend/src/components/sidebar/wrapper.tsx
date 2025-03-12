'use client'

import { cn } from '@/lib/utils'
import { useAppSelector, selectSidebarCollapsed } from '../../../store/index';

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  const collapsed = useAppSelector(selectSidebarCollapsed);
  return (
    <aside
      className={cn(
        'flex left-0 fixed flex-col w-[70px] lg:w-60 h-full bg-background border-r transition-transform duration-300 z-50',
        collapsed && ' -translate-x-full transition-transform duration-300',
      )}
    >
      {children}
    </aside>
  )
}