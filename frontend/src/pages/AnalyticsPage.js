import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../utils/axios';
import '../App.css';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockAnalytics = {
    totalDrafts: 109,
    researchCount: 87,
    totalActivities: 234,
    avgDailyActivity: 12,
    mostActiveDay: {
      date: '2026-02-10',
      count: 18
    },
    monthlyDrafts: [
      { month: 'Aug', count: 8 },
      { month: 'Sep', count: 12 },
      { month: 'Oct', count: 15 },
      { month: 'Nov', count: 20 },
      { month: 'Dec', count: 18 },
      { month: 'Jan', count: 21 }
    ],
    draftsByType: [
      { type: 'Contract', count: 45 },
      { type: 'Civil', count: 32 },
      { type: 'Criminal', count: 18 },
      { type: 'Family', count: 14 }
    ],
    dailyActivity: [
      { date: '2026-02-05', count: 8 },
      { date: '2026-02-06', count: 14 },
      { date: '2026-02-07', count: 12 },
      { date: '2026-02-08', count: 18 },
      { date: '2026-02-09', count: 16 },
      { date: '2026-02-10', count: 18 },
      { date: '2026-02-11', count: 15 }
    ],
    activityByAction: [
      { action: 'Generated Draft', count: 45 },
      { action: 'Edited Draft', count: 28 },
      { action: 'Case Law Search', count: 22 },
      { action: 'Statute Search', count: 18 },
      { action: 'Dictionary Lookup', count: 14 },
      { action: 'Proofreading', count: 12 },
      { action: 'Clause Suggestion', count: 8 }
    ]
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Try to fetch real data from backend
      const response = await axios.get('/analytics');
      
      if (response.data.success) {
        setAnalytics(response.data.data);
      } else {
        // Use mock data if no real data
        setTimeout(() => setAnalytics(mockAnalytics), 1500);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Use mock data on error
      setTimeout(() => setAnalytics(mockAnalytics), 1500);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return typeof num === 'number' ? num.toLocaleString() : 0;
  };

  if (loading) {
    return (
      <Layout>
        <div className="animate-fade-in-up">
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="text-6xl animate-bounce" style={{animationDelay: '0s'}}>📊</div>
              <div className="text-6xl animate-bounce" style={{animationDelay: '0.2s'}}>📈</div>
              <div className="text-6xl animate-bounce" style={{animationDelay: '0.4s'}}>📉</div>
            </div>
            <p className="text-slate-300 text-xl font-semibold">Loading your analytics...</p>
            <p className="text-slate-500 text-sm mt-2">This won't take long</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!analytics) {
    return (
      <Layout>
        <div className="animate-fade-in-up">
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-6">
              <div className="text-8xl animate-bounce">📊</div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">No Analytics Data Yet</h2>
            <p className="text-slate-400 text-lg mb-3">Start creating drafts to see your analytics dashboard</p>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              📝 Create drafts • 🔍 Research cases • 📚 Use features to generate activity data
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 mb-4 flex items-center justify-center gap-3">
            📊 Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Track your drafting productivity, trends, and activity patterns in real-time
          </p>
        </div>

        {/* Key Metrics Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card bg-gradient-to-br from-purple-600/90 to-purple-800/90 border-l-4 border-purple-400 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-5xl group-hover:scale-110 transition-transform">📄</span>
              <span className="text-xs text-purple-200 font-bold uppercase tracking-wider">Total</span>
            </div>
            <p className="text-6xl font-black text-white">{formatNumber(analytics.totalDrafts)}</p>
            <p className="text-purple-200 text-sm mt-4 font-semibold">Total Drafts Created</p>
            <div className="mt-4 h-2 bg-purple-400/30 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-purple-300 to-purple-100 rounded-full"></div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-600/90 to-blue-800/90 border-l-4 border-blue-400 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-5xl group-hover:scale-110 transition-transform">📈</span>
              <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Weekly</span>
            </div>
            <p className="text-6xl font-black text-white">
              {analytics.totalDrafts && analytics.dailyActivity
                ? (analytics.totalDrafts / Math.ceil(analytics.dailyActivity.length / 7)).toFixed(1)
                : '0'}
            </p>
            <p className="text-blue-200 text-sm mt-4 font-semibold">Drafts Per Week</p>
            <div className="mt-4 h-2 bg-blue-400/30 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full"></div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-amber-600/90 to-amber-800/90 border-l-4 border-amber-400 hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-5xl group-hover:scale-110 transition-transform">🎯</span>
              <span className="text-xs text-amber-200 font-bold uppercase tracking-wider">Peak</span>
            </div>
            <p className="text-5xl font-black text-white">
              {analytics.mostActiveDay?.date
                ? new Date(analytics.mostActiveDay.date).toLocaleDateString('en-IN', { weekday: 'short' })
                : '—'}
            </p>
            <p className="text-amber-200 text-sm mt-4 font-semibold">Most Active Day</p>
            <div className="mt-4 h-2 bg-amber-400/30 rounded-full overflow-hidden">
              <div className="h-full w-5/6 bg-gradient-to-r from-amber-300 to-amber-100 rounded-full"></div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-cyan-600/90 to-cyan-800/90 border-l-4 border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-5xl group-hover:scale-110 transition-transform">⏱️</span>
              <span className="text-xs text-cyan-200 font-bold uppercase tracking-wider">Avg</span>
            </div>
            <p className="text-6xl font-black text-white">
              {analytics.avgDailyActivity || '0'}
            </p>
            <p className="text-cyan-200 text-sm mt-4 font-semibold">Activities Per Day</p>
            <div className="mt-4 h-2 bg-cyan-400/30 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-cyan-300 to-cyan-100 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Drafts Per Month - Bar Chart */}
          <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📊</span>
                Drafts Per Month
              </h2>
              <span className="text-xs bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full font-semibold">Last 6 Months</span>
            </div>
            {analytics.monthlyDrafts && analytics.monthlyDrafts.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={analytics.monthlyDrafts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8"
                    style={{ fontSize: '13px', fontWeight: '600' }}
                  />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '13px' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '2px solid #a78bfa',
                      borderRadius: '10px',
                      color: '#fff',
                      boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
                    }}
                    cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#a855f7"
                    radius={[8, 8, 0, 0]}
                    name="Drafts"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400">
                <p>No monthly data available yet</p>
              </div>
            )}
          </div>

          {/* Case Type Distribution - Pie Chart */}
          <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📋</span>
                Case Type Distribution
              </h2>
              <span className="text-xs bg-cyan-500/30 text-cyan-200 px-3 py-1 rounded-full font-semibold">{analytics.draftsByType?.length || 0} Types</span>
            </div>
            {analytics.draftsByType && analytics.draftsByType.length > 0 ? (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={analytics.draftsByType}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      startAngle={90}
                      endAngle={450}
                    >
                      {analytics.draftsByType.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            '#a855f7',
                            '#06b6d4',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#ec4899'
                          ][index % 6]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '2px solid #06b6d4',
                        borderRadius: '10px',
                        color: '#fff',
                        boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                  {analytics.draftsByType.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: [
                            '#a855f7',
                            '#06b6d4',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#ec4899'
                          ][idx % 6]
                        }}
                      />
                      <span className="text-sm text-slate-300 font-semibold flex-1">{item.type}</span>
                      <span className="text-sm font-bold text-white">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400">
                <p>No case type data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Activity Trend - Line Chart */}
        <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 mb-10 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">📅</span>
              Weekly Activity Trend
            </h2>
            <span className="text-xs bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full font-semibold">Last 7+ Days</span>
          </div>
          {analytics.dailyActivity && analytics.dailyActivity.length > 0 ? (
            <ResponsiveContainer width="100%" height={370}>
              <LineChart data={analytics.dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  style={{ fontSize: '13px', fontWeight: '600' }}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }
                />
                <YAxis stroke="#94a3b8" style={{ fontSize: '13px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '2px solid #3b82f6',
                    borderRadius: '10px',
                    color: '#fff',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                  }}
                  labelFormatter={(date) =>
                    new Date(date).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })
                  }
                  cursor={{ stroke: '#3b82f6', strokeDasharray: '5 5' }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#60a5fa', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Daily Activities"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-slate-400">
              <p>No daily activity data available yet</p>
            </div>
          )}
        </div>

        {/* Activity by Action - Enhanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/30 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                Activity by Action Type
              </h2>
              <span className="text-xs bg-green-500/30 text-green-200 px-3 py-1 rounded-full font-semibold">{analytics.activityByAction?.length || 0} Actions</span>
            </div>
            {analytics.activityByAction && analytics.activityByAction.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto activity-scroll pr-2">
                {analytics.activityByAction.map((item, idx) => {
                  const maxCount = Math.max(
                    ...analytics.activityByAction.map(a => a.count),
                    1
                  );
                  const widthPercent = (item.count / maxCount) * 100;
                  return (
                    <div key={idx} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300 text-sm font-semibold">
                          {item.action}
                        </span>
                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                          {item.count}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all group-hover:from-green-400 group-hover:to-green-500"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400">No activity data available yet</p>
            )}
          </div>

          {/* Summary Stats */}
          <div className="space-y-4">
            <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 h-full">
              <div className="flex items-start gap-4 h-full flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4">📈</div>
                  <p className="text-slate-400 text-sm mb-3 font-semibold">Total Activities</p>
                  <p className="text-6xl font-black text-white">{formatNumber(analytics.totalActivities)}</p>
                </div>
                <p className="text-slate-500 text-xs font-semibold">All recorded actions in system</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 h-full">
              <div className="flex items-start gap-4 h-full flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4">🔥</div>
                  <p className="text-slate-400 text-sm mb-3 font-semibold">Research Queries</p>
                  <p className="text-6xl font-black text-white">{formatNumber(analytics.researchCount)}</p>
                </div>
                <p className="text-slate-500 text-xs font-semibold">Case law & statute searches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => {
              setLoading(true);
              fetchAnalytics();
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 text-white rounded-lg hover:from-purple-700 hover:via-cyan-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:-translate-y-1 duration-300 text-lg"
          >
            🔄 Refresh Analytics
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
