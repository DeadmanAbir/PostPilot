'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Hint } from '../ui/hint'
import { useAppSelector, selectSidebarCollapsed, useAppDispatch, expandSidebar, collapseSidebar } from '../../../store/index';

const Toggle = () => {
  const collapsed = useAppSelector(selectSidebarCollapsed);
  const dispatch = useAppDispatch();
  const label = collapsed ? 'Expand' : 'Collapse';

  return (

    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4 ">
          <Hint label={label} side="right" asChild>
            <Button onMouseEnter={() => dispatch(expandSidebar())} variant="outline" className="h-auto p-2">
              <Menu className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full justify-between'>
          <p className='font-semibold text-primary'>
            Dashboard
          </p>
          <Hint label={label} side="right" asChild>
            <Button onClick={() => dispatch(collapseSidebar())} variant="ghost" className="h-auto p-2">
              <Menu className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export default Toggle