import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link href="/" className="flex items-center">
                <Image src="/logo.png" width="26" height="28" className="mr-3" alt="Logo" priority />
                <span className="self-center tracking-tight text-sm text-gray-800 font-bold whitespace-nowrap">DATA GENERATOR</span>
            </Link>
            <div className="flex items-center justify-between p-2 w-auto order-1" id="navbar-sticky">
              <ul className="flex flex-row space-x-8 font-semibold">
                <li>
                  <Link href="/about" className="block text-gray-900 rounded hover:text-gray-800">About</Link>
                </li>
                <li>
                  <Link href="/generate" className="block text-gray-900 rounded hover:text-gray-800">Generate</Link>
                </li>
                <li>
                  <Link href="/data" className="block text-gray-900 rounded hover:text-gray-800">Data</Link>
                </li>
                <li>
                  <Link href="/insights" className="block text-gray-900 rounded hover:text-gray-800">Insights</Link>
                </li>
                <li>
                  <Link href="/export" className="block text-gray-900 rounded hover:text-gray-800">Export</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}
