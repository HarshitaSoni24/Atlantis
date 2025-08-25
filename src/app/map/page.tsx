import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-8 mt-10 max-w-7xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Project Atlantis</h1>
        <p className="text-lg text-zinc-400">Your mission control dashboard awaits.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* System Status Panel */}
        <div className="md:col-span-1 card-panel">
          <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex items-center justify-between">
              <span>Power Core</span>
              <span className="text-green-400 font-bold">Optimal</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Life Support</span>
              <span className="text-green-400 font-bold">Stable</span>
            </div>
            <div className="flex items-center justify-between">
              <span>External Scanners</span>
              <span className="text-yellow-400 font-bold">Minor Issues</span>
            </div>
          </div>
        </div>

        {/* Main Risk Overview Panel */}
        <div className="md:col-span-3 card-panel">
          <h2 className="text-xl font-semibold text-white mb-4">Risk Overview</h2>
          <p className="text-zinc-400 mb-6">Live analysis of operational parameters and external threats.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-zinc-700 rounded-lg p-4">
              <span className="text-sm text-zinc-400">Threat Level</span>
              <p className="text-4xl font-bold mt-2 text-red-500">High</p>
            </div>
            <div className="col-span-1 bg-zinc-700 rounded-lg p-4">
              <span className="text-sm text-zinc-400">Data Integrity</span>
              <p className="text-4xl font-bold mt-2 text-green-500">98%</p>
            </div>
            <div className="col-span-1 bg-zinc-700 rounded-lg p-4">
              <span className="text-sm text-zinc-400">Active Alerts</span>
              <p className="text-4xl font-bold mt-2 text-yellow-500">2</p>
            </div>
          </div>
        </div>

        {/* Live Data Chart Panel */}
        <div className="md:col-span-4 card-panel">
          <h2 className="text-xl font-semibold text-white mb-4">Live Data Chart</h2>
          <div className="h-64 bg-zinc-800 rounded-lg border border-zinc-600 flex items-center justify-center text-zinc-500 italic">
            -- Chart Placeholder --
          </div>
        </div>

        {/* Alert List Panel */}
        <div className="md:col-span-4 card-panel">
          <h2 className="text-xl font-semibold text-white mb-4">Active Alerts</h2>
          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="p-4 rounded-md bg-red-800/30 border border-red-700 flex items-center justify-between">
              <span>Unidentified vessel detected in Sector 7G.</span>
              <span className="bg-red-500 text-white font-semibold text-xs px-2 py-1 rounded-full">HIGH</span>
            </li>
            <li className="p-4 rounded-md bg-yellow-800/30 border border-yellow-700 flex items-center justify-between">
              <span>Seismic activity increasing near the continental shelf.</span>
              <span className="bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-full">MEDIUM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}