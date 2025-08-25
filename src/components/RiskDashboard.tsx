import Alerts from './Alerts';

export default function RiskDashboard() {
  return (
    // Use a CSS grid for a more complex layout
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Main Risk Overview Panel */}
      <div className="md:col-span-2 holo-card p-6">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4" style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}>Risk Overview</h2>
        <p className="text-slate-300">Live analysis of operational parameters and external threats.</p>
        
        {/* Placeholder for a cool chart */}
        <div className="mt-6 h-64 bg-black/30 rounded-lg p-4 border border-cyan-800/50 flex items-center justify-center">
          <p className="text-cyan-600">-- Live Data Chart Placeholder --</p>
        </div>
      </div>

      {/* Side Panel for Alerts and Status */}
      <div className="md:col-span-1 space-y-6">
        
        {/* System Status Card */}
        <div className="holo-card p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-3">System Status</h3>
          <div className="space-y-2">
            <p className="text-green-400">Power Core: <span className="font-bold">100% stable</span></p>
            <p className="text-green-400">Life Support: <span className="font-bold">Optimal</span></p>
            <p className="text-yellow-400">External Scanners: <span className="font-bold">Minor Interference</span></p>
          </div>
        </div>
        
        {/* Alerts Component */}
        <Alerts />
      </div>
    </div>
  );
}