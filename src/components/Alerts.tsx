export default function Alerts() {
  return (
    <div className="holo-card p-6">
      <h3 className="text-xl font-bold text-red-400 mb-4" style={{ textShadow: '0 0 5px rgba(255, 50, 50, 0.7)' }}>
        Active Alerts
      </h3>
      <ul className="space-y-3">
        {/* High Priority Alert with pulsing animation */}
        <li className="p-3 rounded-md border border-red-500/80 bg-red-950/50 animate-pulse-red">
          <span className="font-bold text-red-400">High Priority:</span> <span className="text-slate-200">Unidentified vessel detected in Sector 7G.</span>
        </li>
        {/* Medium Priority Alert */}
        <li className="p-3 rounded-md border border-yellow-500/60 bg-yellow-950/50">
          <span className="font-bold text-yellow-400">Medium Priority:</span> <span className="text-slate-200">Seismic activity increasing.</span>
        </li>
      </ul>
    </div>
  );
}