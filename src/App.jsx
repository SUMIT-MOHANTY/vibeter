import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Shield, RefreshCw } from 'lucide-react';

const allocation = [
  { name: 'US Equities', value: 42 },
  { name: 'International', value: 18 },
  { name: 'Bonds', value: 22 },
  { name: 'Alternatives', value: 12 },
  { name: 'Cash', value: 6 },
];

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#64748b'];

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 120, value: '$24,840', change: '+1.8%' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 85, value: '$34,210', change: '+0.9%' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 210, value: '$96,180', change: '+1.2%' },
  { symbol: 'BND', name: 'Vanguard Total Bond', shares: 450, value: '$33,750', change: '-0.3%' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investment Portfolio Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Asset allocation, risk analytics, and rebalancing insights</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
          Rebalance Portfolio
        </button>
      </header>

      <main className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Kpi icon={<DollarSign size={18} />} label="Portfolio Value" value="$1,284,920" tone="indigo" />
          <Kpi icon={<TrendingUp size={18} />} label="YTD Return" value="+12.4%" tone="emerald" />
          <Kpi icon={<Shield size={18} />} label="Risk Score" value="Moderate" tone="amber" />
          <Kpi icon={<RefreshCw size={18} />} label="Rebalance Needed" value="3 positions" tone="rose" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Asset Allocation</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                    {allocation.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Top Holdings</h2>
            <div className="space-y-3">
              {holdings.map((h) => (
                <div key={h.symbol} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div>
                    <div className="font-semibold">{h.symbol}</div>
                    <div className="text-xs text-slate-500">{h.name} · {h.shares} shares</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{h.value}</div>
                    <div className={`text-xs ${h.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{h.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Kpi({ icon, label, value, tone }) {
  const tones = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${tones[tone]}`}>{icon}</div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </div>
  );
}
