import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      {/* Logo */}
      <Link href="/" className="text-lg font-bold tracking-widest text-blue-400">
        ATLANTIS
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul className="flex items-center space-x-6 text-sm font-medium">
          <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
          <li className="group relative">
            <a href="#" className="flex items-center text-gray-400 hover:text-white">
              <span>Features</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </a>
            {/* Dropdown Menu */}
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 transition-all duration-300 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 z-50">
              <li><Link href="/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Risk Dashboard</Link></li>
              <li><Link href="/map" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Live Map</Link></li>
            </ul>
          </li>
          <li>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md text-xs hover:bg-blue-600">
              New Report
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}