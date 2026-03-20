export const metadata = {
  verification: {
    google: "MuQ4d2r4RyBZZqpz"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}