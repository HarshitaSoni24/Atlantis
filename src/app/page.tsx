import Header from '@/components/Header';

export default function HomePage() {
  return (
    // Main container that fills the screen and prevents scrolling
    <div className="flex flex-col h-screen p-4 gap-4">
      {/* Integrated Header */}
      <Header />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-4 grid-rows-3 gap-4 flex-grow">

        {/* Stat Cards (Top Row) */}
        <div className="dark-panel col-span-1 row-span-1 p-4 flex flex-col justify-center text-center">
          <p className="text-sm text-gray-400">Threat Level</p>
          <p className="text-4xl font-bold text-red-500 mt-2">High</p>
        </div>
        <div className="dark-panel col-span-1 row-span-1 p-4 flex flex-col justify-center text-center">
          <p className="text-sm text-gray-400">Data Integrity</p>
          <p className="text-4xl font-bold text-green-500 mt-2">99.2%</p>
        </div>
        <div className="dark-panel col-span-1 row-span-1 p-4 flex flex-col justify-center text-center">
          <p className="text-sm text-gray-400">System Status</p>
          <p className="text-4xl font-bold text-blue-400 mt-2">Optimal</p>
        </div>

        {/* Sidebar (Alerts & Activity) */}
        <div className="dark-panel col-span-1 row-span-3 p-4 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-white mb-2">Active Alerts</h3>
            <ul className="space-y-2 text-sm">
              <li className="p-2 rounded bg-red-800/50 border border-red-700">
                <p className="font-semibold text-red-300">High: Unidentified Vessel</p>
              </li>
              <li className="p-2 rounded bg-yellow-800/50 border border-yellow-700">
                <p className="font-semibold text-yellow-300">Medium: Seismic Activity</p>
              </li>
            </ul>
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-white mb-2">Recent Activity</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System scan completed.</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>User 'Ganesh' logged in.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Chart (Bottom-Left) */}
        <div className="dark-panel col-span-3 row-span-2 p-4 flex flex-col">
          <h3 className="font-semibold text-white mb-2">Live Data Throughput</h3>
          <div className="flex-grow bg-gray-900 rounded-md flex items-center justify-center text-gray-600 italic">
            -- Chart Placeholder --
          </div>
        </div>
      </div>
    </div>
  );
}