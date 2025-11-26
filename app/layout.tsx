import './globals.css'
import Providers from '../components/Providers'

export const metadata = {
  title: 'xScales — cofounderx.app',
  description: 'xScales — product analytics for founders (skeleton)'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
