import './globals.css'


export const metadata = {
  title: 'Some Random Blog',
  description: 'The best random blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
