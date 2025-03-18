import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location, context }) => {
    const { authentication } = context
    if (!authentication.isLogged()) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}