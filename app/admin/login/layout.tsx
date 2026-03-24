export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page doesn't need the admin sidebar layout
  // Just render the children directly (Providers come from parent /admin/layout.tsx)
  return <>{children}</>
}
