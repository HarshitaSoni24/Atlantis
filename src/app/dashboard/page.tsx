import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 mt-10 max-w-7xl">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-lg text-gray-400 mt-1">Real-time mission overview and analytics.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn-primary-gradient">
            Generate New Report
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Panels */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel text-center p-6">
              <p className="text-sm font-medium text-gray-400">Threat Level</p>
              <p className="text-5xl font-bold mt-2 text-red-400">High</p>
            </div>
            <div className="glass-panel text-center p-6">
              <p className="text-sm font-medium text-gray-400">Data Integrity</p>
              <p className="text-5xl font-bold mt-2 text-green-400">99.2%</p>
            </div>
            <div className="glass-panel text-center p-6">
              <p className="text-sm font-medium text-gray-400">System Status</p>
              <p className="text-5xl font-bold mt-2 text-gradient">Optimal</p>
            </div>
          </div>

          {/* Live Data Chart */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Data Throughput (TB/s)</h2>
            <div className="h-80 rounded-lg flex items-center justify-center text-gray-400">
              {/* A more realistic SVG chart placeholder */}
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgba(167, 139, 250, 0.4)'}} />
                    <stop offset="100%" style={{stopColor: 'rgba(167, 139, 250, 0)'}} />
                  </linearGradient>
                </defs>
                <path d="M 0 150 Q 50 80, 100 120 T 200 100 T 300 140 T 400 90 V 200 H 0 Z" fill="url(#gradient)" />
                <path d="M 0 150 Q 50 80, 100 120 T 200 100 T 300 140 T 400 90" strokeWidth="2" stroke="rgba(167, 139, 250, 1)" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Active Alerts */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Active Alerts</h2>
            <ul className="space-y-4 text-sm">
              <li className="p-4 rounded-lg bg-red-900/30 border border-red-500/50">
                <p className="font-semibold text-red-300">High: Unidentified Vessel</p>
                <p className="text-gray-400 mt-1">An unknown contact has been detected.</p>
              </li>
              <li className="p-4 rounded-lg bg-yellow-900/30 border border-yellow-500/50">
                <p className="font-semibold text-yellow-300">Medium: Seismic Activity</p>
                <p className="text-gray-400 mt-1">Minor tremors increasing.</p>
              </li>
            </ul>
          </div>
          
          {/* Recent Activity */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 rounded-full"><div className="w-2 h-2 bg-green-500 rounded-full"></div></div>
                <span>System scan completed successfully.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-500/20 rounded-full"><div className="w-2 h-2 bg-gray-400 rounded-full"></div></div>
                <span>User 'Ganesh' logged in.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/20 rounded-full"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div></div>
                <span>Data stream re-routed.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}