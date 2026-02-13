import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../utils/axios';
import '../App.css';

const HistoryPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState('all'); // 'all', '7days', '30days', 'custom'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeTab, setActiveTab] = useState('search'); // 'search', 'filters', 'date'

  // Mock data for demonstration
  const mockActivities = [
    {
      _id: '1',
      user: { name: 'John Doe', email: 'john@example.com' },
      action: 'Generated Draft',
      draftName: 'Employment Contract - TechCorp',
      caseType: 'Contract',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: 'Created new employment contract'
    },
    {
      _id: '2',
      user: { name: 'Jane Smith', email: 'jane@example.com' },
      action: 'Edited Draft',
      draftName: 'Settlement Agreement',
      caseType: 'Civil',
      status: 'success',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      details: 'Updated clause terms'
    },
    {
      _id: '3',
      user: { name: 'John Doe', email: 'john@example.com' },
      action: 'Case Law Search',
      draftName: '',
      caseType: 'Criminal',
      status: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      details: 'Searched for precedent cases'
    },
    {
      _id: '4',
      user: { name: 'Sarah Wilson', email: 'sarah@example.com' },
      action: 'Downloaded Draft',
      draftName: 'Divorce Decree - Final',
      caseType: 'Family',
      status: 'success',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      details: 'Downloaded as PDF'
    },
    {
      _id: '5',
      user: { name: 'Mike Johnson', email: 'mike@example.com' },
      action: 'Proofreading',
      draftName: 'Contract Amendment',
      caseType: 'Contract',
      status: 'success',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      details: 'Proofed document, no changes'
    },
    {
      _id: '6',
      user: { name: 'Jane Smith', email: 'jane@example.com' },
      action: 'Statute Search',
      draftName: '',
      caseType: 'Civil',
      status: 'success',
      timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
      details: 'Searched state statutes'
    },
    {
      _id: '7',
      user: { name: 'John Doe', email: 'john@example.com' },
      action: 'Clause Suggestion',
      draftName: 'Non-Disclosure Agreement',
      caseType: 'Contract',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      details: 'Added arbitration clause'
    },
    {
      _id: '8',
      user: { name: 'Sarah Wilson', email: 'sarah@example.com' },
      action: 'Deleted Draft',
      draftName: 'Old Draft - Archived',
      caseType: 'Criminal',
      status: 'success',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      details: 'Deleted outdated document'
    }
  ];

  useEffect(() => {
    fetchHistory();
  }, [filterAction, filterType, searchTerm, page]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/activity/history', {
        params: {
          action: filterAction === 'all' ? undefined : filterAction,
          type: filterType === 'all' ? undefined : filterType,
          search: searchTerm || undefined,
          page,
          limit: 20
        }
      });

      if (response.data.success) {
        setActivities(response.data.activities);
        setTotalPages(response.data.pagination.pages);
      } else {
        // Use mock data if no success
        setTimeout(() => {
          setActivities(mockActivities);
          setTotalPages(1);
        }, 1200);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
      // Use mock data on error
      setTimeout(() => {
        setActivities(mockActivities);
        setTotalPages(1);
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionIcon = (action) => {
    const iconMap = {
      'Generated Draft': '✨',
      'Edited Draft': '✏️',
      'Deleted Draft': '🗑️',
      'Downloaded Draft': '⬇️',
      'Proofreading': '🔍',
      'Clause Suggestion': '💡',
      'Case Law Search': '📚',
      'Statute Search': '📖',
      'Dictionary Lookup': '📘',
      'Template Used': '📋',
      'Login': '🔐',
      'Registered': '✅'
    };
    return iconMap[action] || '📌';
  };

  const getActionColor = (action) => {
    const colorMap = {
      'Generated Draft': 'text-purple-400',
      'Edited Draft': 'text-blue-400',
      'Deleted Draft': 'text-red-400',
      'Downloaded Draft': 'text-cyan-400',
      'Proofreading': 'text-yellow-400',
      'Clause Suggestion': 'text-pink-400',
      'Case Law Search': 'text-green-400',
      'Statute Search': 'text-orange-400',
      'Dictionary Lookup': 'text-indigo-400',
      'Template Used': 'text-amber-400',
      'Login': 'text-slate-400',
      'Registered': 'text-emerald-400'
    };
    return colorMap[action] || 'text-slate-300';
  };

  const getFilteredActivities = () => {
    let filtered = activities;

    // Filter by date if custom range is set
    if (dateRange !== 'all' && (startDate || endDate)) {
      filtered = filtered.filter((activity) => {
        const actDate = new Date(activity.createdAt).toISOString().split('T')[0];
        if (startDate && actDate < startDate) return false;
        if (endDate && actDate > endDate) return false;
        return true;
      });
    }

    return filtered;
  };

  const filteredActivities = getFilteredActivities();

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4 flex items-center justify-center gap-3">
            📊 Activity History
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Track all your actions and changes in real-time with comprehensive filtering and search
          </p>
        </div>

        {/* Enhanced Filters Section - TAB BASED */}
        <div className="card mb-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 p-0 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex gap-0 bg-slate-900/50 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 px-6 py-4 font-bold transition-all border-b-4 flex items-center justify-center gap-2 text-lg transform hover:scale-105 ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 border-b-purple-500 text-white shadow-lg shadow-purple-500/40'
                  : 'border-b-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              🔍 Search
            </button>
            <button
              onClick={() => setActiveTab('filters')}
              className={`flex-1 px-6 py-4 font-bold transition-all border-b-4 flex items-center justify-center gap-2 text-lg transform hover:scale-105 ${
                activeTab === 'filters'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 border-b-blue-500 text-white shadow-lg shadow-blue-500/40'
                  : 'border-b-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              ⚡ Filters
            </button>
            <button
              onClick={() => setActiveTab('date')}
              className={`flex-1 px-6 py-4 font-bold transition-all border-b-4 flex items-center justify-center gap-2 text-lg transform hover:scale-105 ${
                activeTab === 'date'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 border-b-pink-500 text-white shadow-lg shadow-pink-500/40'
                  : 'border-b-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              📅 Date Range
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="animate-fadeIn">
                <label className="block text-slate-300 text-sm font-bold mb-4 flex items-center gap-2">
                  🔍 Search Activities
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by title or description..."
                  className="w-full px-5 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-base font-medium"
                />
                <p className="text-slate-400 text-xs mt-3">💡 Tip: Search finds activities by title or description instantly</p>
              </div>
            )}

            {/* Filters Tab */}
            {activeTab === 'filters' && (
              <div className="animate-fadeIn space-y-6">
                <div>
                  <label className="block text-slate-300 text-sm font-bold mb-4 flex items-center gap-2">
                    ⚡ Filter by Action Type
                  </label>
                  <select
                    value={filterAction}
                    onChange={(e) => {
                      setFilterAction(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-5 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base hover:bg-slate-600"
                  >
                    <option value="all" className="bg-slate-700 text-white font-medium">✨ All Actions</option>
                    <option value="Generated Draft" className="bg-slate-700 text-white font-medium">✨ Generated Draft</option>
                    <option value="Edited Draft" className="bg-slate-700 text-white font-medium">✏️ Edited Draft</option>
                    <option value="Deleted Draft" className="bg-slate-700 text-white font-medium">🗑️ Deleted Draft</option>
                    <option value="Case Law Search" className="bg-slate-700 text-white font-medium">📚 Case Law Search</option>
                    <option value="Statute Search" className="bg-slate-700 text-white font-medium">📖 Statute Search</option>
                    <option value="Dictionary Lookup" className="bg-slate-700 text-white font-medium">📘 Dictionary Lookup</option>
                    <option value="Proofreading" className="bg-slate-700 text-white font-medium">🔍 Proofreading</option>
                    <option value="Clause Suggestion" className="bg-slate-700 text-white font-medium">💡 Clause Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-bold mb-4 flex items-center gap-2">
                    📋 Filter by Case Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-5 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base hover:bg-slate-600"
                  >
                    <option value="all" className="bg-slate-700 text-white font-medium">📋 All Types</option>
                    <option value="Contract" className="bg-slate-700 text-white font-medium">📜 Contract</option>
                    <option value="Civil" className="bg-slate-700 text-white font-medium">⚖️ Civil</option>
                    <option value="Criminal" className="bg-slate-700 text-white font-medium">🚨 Criminal</option>
                    <option value="Family" className="bg-slate-700 text-white font-medium">👨‍👩‍👧‍👦 Family</option>
                  </select>
                </div>
                <p className="text-slate-400 text-xs">💡 Tip: Combine these filters for precise results</p>
              </div>
            )}

            {/* Date Range Tab */}
            {activeTab === 'date' && (
              <div className="animate-fadeIn">
                <label className="block text-slate-300 text-sm font-bold mb-6 flex items-center gap-2">
                  📅 Select Date Range
                </label>

                {/* Date Range Sub-tabs */}
                <div className="flex gap-3 flex-wrap mb-8">
                  {[
                    { value: 'all', label: 'All Time', emoji: '🌍', color: 'from-amber-600 to-amber-700 border-amber-400 shadow-amber-500' },
                    { value: '7days', label: 'Last 7 Days', emoji: '📆', color: 'from-blue-600 to-blue-700 border-blue-400 shadow-blue-500' },
                    { value: '30days', label: 'Last 30 Days', emoji: '📊', color: 'from-cyan-600 to-cyan-700 border-cyan-400 shadow-cyan-500' },
                    { value: 'custom', label: 'Custom Range', emoji: '✏️', color: 'from-pink-600 to-pink-700 border-pink-400 shadow-pink-500' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDateRange(option.value);
                        setPage(1);
                        if (option.value === '7days') {
                          const d = new Date();
                          setEndDate(d.toISOString().split('T')[0]);
                          d.setDate(d.getDate() - 7);
                          setStartDate(d.toISOString().split('T')[0]);
                        } else if (option.value === '30days') {
                          const d = new Date();
                          setEndDate(d.toISOString().split('T')[0]);
                          d.setDate(d.getDate() - 30);
                          setStartDate(d.toISOString().split('T')[0]);
                        } else {
                          setStartDate('');
                          setEndDate('');
                        }
                      }}
                      className={`flex items-center gap-2 px-6 py-4 rounded-lg font-bold transition-all transform border-2 ${
                        dateRange === option.value
                          ? `bg-gradient-to-br ${option.color} text-white shadow-lg shadow-${option.color}/50`
                          : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500 hover:scale-105'
                      }`}
                    >
                      <span className="text-xl">{option.emoji}</span>
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Date Range Inputs */}
                {dateRange === 'custom' && (
                  <div className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 border-2 border-pink-500/40 rounded-lg p-8 animate-slideDown">
                    <label className="block text-slate-200 text-sm font-bold mb-6 flex items-center gap-2">
                      ✏️ Configure Custom Date Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-pink-300 text-sm font-bold mb-3 flex items-center gap-2">
                          📍 Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            setPage(1);
                          }}
                          className="w-full px-5 py-3 bg-slate-700 border-2 border-pink-500/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-base font-medium hover:border-pink-500/60"
                        />
                      </div>
                      <div>
                        <label className="block text-pink-300 text-sm font-bold mb-3 flex items-center gap-2">
                          📍 End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => {
                            setEndDate(e.target.value);
                            setPage(1);
                          }}
                          className="w-full px-5 py-3 bg-slate-700 border-2 border-pink-500/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-base font-medium hover:border-pink-500/60"
                        />
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-slate-600/50 border border-pink-500/20 rounded-lg">
                      <p className="text-pink-200 text-sm font-semibold flex items-center gap-2">
                        ✨ {startDate && endDate ? `Showing data from ${startDate} to ${endDate}` : '📅 Select both dates to filter'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Active Date Range Display */}
                {dateRange !== 'custom' && (
                  <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border-2 border-slate-600/50 rounded-lg p-6">
                    <p className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      {dateRange === 'all' && 'Displaying all activities from your entire history'}
                      {dateRange === '7days' && 'Displaying activities from the last 7 days'}
                      {dateRange === '30days' && 'Displaying activities from the last 30 days'}
                    </p>
                  </div>
                )}

                <p className="text-slate-400 text-xs mt-6">💡 Tip: Quick date buttons auto-calculate ranges. Custom range lets you pick specific dates.</p>
              </div>
            )}
          </div>

          {/* Active Filters Display - Outside tabs, full width */}
          {(searchTerm || filterAction !== 'all' || filterType !== 'all' || dateRange !== 'all') && (
            <div className="border-t border-slate-700 bg-slate-800/50 px-8 py-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-slate-400 font-semibold text-sm">Active Filters:</span>
                
                {searchTerm && (
                  <span className="px-3 py-2 bg-purple-600/30 border border-purple-500 rounded-full text-xs text-purple-200 font-bold inline-flex items-center gap-2 hover:bg-purple-600/50 transition-all">
                    🔍 {searchTerm}
                    <button onClick={() => { setSearchTerm(''); setPage(1); }} className="hover:text-red-300 ml-1 font-bold">✕</button>
                  </span>
                )}
                
                {filterAction !== 'all' && (
                  <span className="px-3 py-2 bg-blue-600/30 border border-blue-500 rounded-full text-xs text-blue-200 font-bold inline-flex items-center gap-2 hover:bg-blue-600/50 transition-all">
                    ⚡ {filterAction}
                    <button onClick={() => { setFilterAction('all'); setPage(1); }} className="hover:text-red-300 ml-1 font-bold">✕</button>
                  </span>
                )}
                
                {filterType !== 'all' && (
                  <span className="px-3 py-2 bg-green-600/30 border border-green-500 rounded-full text-xs text-green-200 font-bold inline-flex items-center gap-2 hover:bg-green-600/50 transition-all">
                    📋 {filterType}
                    <button onClick={() => { setFilterType('all'); setPage(1); }} className="hover:text-red-300 ml-1 font-bold">✕</button>
                  </span>
                )}
                
                {dateRange !== 'all' && (
                  <span className="px-3 py-2 bg-pink-600/30 border border-pink-500 rounded-full text-xs text-pink-200 font-bold inline-flex items-center gap-2 hover:bg-pink-600/50 transition-all">
                    📅 {dateRange === '7days' ? 'Last 7 days' : dateRange === '30days' ? 'Last 30 days' : 'Custom range'}
                    <button onClick={() => { setDateRange('all'); setPage(1); }} className="hover:text-red-300 ml-1 font-bold">✕</button>
                  </span>
                )}
                
                <button
                  onClick={() => {
                    setFilterAction('all');
                    setFilterType('all');
                    setSearchTerm('');
                    setDateRange('all');
                    setPage(1);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold transition-all ml-2"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Activity Timeline - Enhanced */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="text-6xl animate-bounce" style={{animationDelay: '0s'}}>📝</div>
                <div className="text-6xl animate-bounce" style={{animationDelay: '0.2s'}}>⏳</div>
                <div className="text-6xl animate-bounce" style={{animationDelay: '0.4s'}}>📊</div>
              </div>
              <p className="text-slate-300 text-xl font-semibold">Loading activity history...</p>
              <p className="text-slate-500 text-sm mt-2">Fetching your recent activities</p>
            </div>
          ) : filteredActivities.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <div className="text-sm text-slate-300 font-semibold">
                  📊 Showing <span className="text-purple-400 font-bold">{filteredActivities.length}</span> of <span className="text-slate-400">{activities.length}</span> activities
                </div>
              </div>

              {filteredActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="group card glass-hover border-l-4 border-purple-500 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-600/30 transition-all transform hover:-translate-y-1 duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl mt-1 group-hover:scale-125 transition-transform flex-shrink-0">{getActionIcon(activity.action)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className={`text-lg font-bold ${getActionColor(activity.action)}`}>
                          {activity.action}
                        </h3>
                        {activity.type && (
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-xs font-bold border border-purple-400/50 shadow-lg">
                            {activity.type}
                          </span>
                        )}
                      </div>
                      <p className="text-white text-base font-semibold mb-2 truncate">{activity.title}</p>
                      {activity.details && (
                        <p className="text-slate-300 text-sm mb-3 line-clamp-2">{activity.details}</p>
                      )}
                      <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-slate-400 text-xs font-semibold">
                          ⏰ {formatDate(activity.createdAt)}
                        </p>
                        {activity.metadata?.searchQuery && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-mono">
                            {activity.metadata.searchQuery}
                          </span>
                        )}
                        {activity.metadata?.resultsCount && (
                          <span className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-xs font-semibold">
                            {activity.metadata.resultsCount} results
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-6 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 hover:border-slate-500 transition-all font-semibold"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, page - 2) + i;
                      if (pageNum > totalPages) return null;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                            pageNum === page
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-slate-400 font-semibold">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-700 hover:to-purple-900 transition-all font-semibold"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="card text-center py-20 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-dashed border-slate-700">
              <div className="text-8xl mb-6">📭</div>
              <h3 className="text-3xl font-bold text-white mb-3">No Activities Found</h3>
              <p className="text-slate-400 text-lg mb-4">
                {activities.length === 0
                  ? 'Start creating drafts and searching to see your activity history here'
                  : 'Try adjusting your filters to see more activities'}
              </p>
              {(searchTerm || filterAction !== 'all' || filterType !== 'all' || dateRange !== 'all') && (
                <button
                  onClick={() => {
                    setFilterAction('all');
                    setFilterType('all');
                    setSearchTerm('');
                    setDateRange('all');
                    setPage(1);
                  }}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
