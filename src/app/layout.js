import './globals.css'
import { Inter } from 'next/font/google';
import Navbar from 'src/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Data Generator',
  description: 'Data Generation Platform for Statistical Learning and Machine Learning.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="mt-10">{children}</div>
      </body>
    </html>
  )
}
