import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from '../utils/axios';
import '../App.css';

const ResearchPage = () => {
  const [activeTab, setActiveTab] = useState('caseLaw');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setSearchResults([]);
    
    try {
      let response;
      
      if (activeTab === 'caseLaw') {
        response = await axios.post('/research/cases', { query: searchQuery });
        setSearchResults(response.data.results || []);
      } else if (activeTab === 'statutes') {
        response = await axios.post('/research/statutes', { query: searchQuery });
        setSearchResults(response.data.results || []);
      } else if (activeTab === 'dictionary') {
        response = await axios.post('/research/dictionary', { term: searchQuery });
        // Dictionary returns single result, format it for display
        if (response.data.success) {
          setSearchResults([{
            term: response.data.term,
            definition: response.data.definition,
            category: 'Indian Law'
          }]);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            🔍 Legal Research Tools
          </h1>
          <p className="text-slate-400 text-lg">
            AI-powered Indian legal research - Cases, Statutes & Definitions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-600 to-blue-800 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setActiveTab('caseLaw')}>
            <div className="flex items-center gap-4">
              <div className="text-5xl">📚</div>
              <div>
                <p className="text-blue-200 text-sm">Case Law Database</p>
                <p className="text-3xl font-bold text-white mt-1">AI-Powered</p>
                <p className="text-blue-300 text-xs mt-1">Gemini AI Research</p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-green-600 to-green-800 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setActiveTab('statutes')}>
            <div className="flex items-center gap-4">
              <div className="text-5xl">📖</div>
              <div>
                <p className="text-green-200 text-sm">Indian Statutes</p>
                <p className="text-3xl font-bold text-white mt-1">AI-Powered</p>
                <p className="text-green-300 text-xs mt-1">Gemini AI Research</p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setActiveTab('dictionary')}>
            <div className="flex items-center gap-4">
              <div className="text-5xl">📘</div>
              <div>
                <p className="text-purple-200 text-sm">Legal Dictionary</p>
                <p className="text-3xl font-bold text-white mt-1">AI-Powered</p>
                <p className="text-purple-300 text-xs mt-1">Gemini AI Definitions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('caseLaw')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'caseLaw'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">📚</span>
              Case Law Database
            </button>
            <button
              onClick={() => setActiveTab('statutes')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'statutes'
                  ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg shadow-green-500/30 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">📖</span>
              Statute Reference
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'dictionary'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">📘</span>
              Legal Dictionary
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 text-xl">🔍</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={
                activeTab === 'caseLaw' ? 'Search cases, citations, or legal issues...' :
                activeTab === 'statutes' ? 'Search statutes, acts, or sections...' :
                'Search legal terms or definitions...'
              }
              style={{ color: '#000', backgroundColor: '#fff' }}
              className="w-full pl-12 pr-32 py-4 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg placeholder-slate-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all disabled:opacity-50 shadow-lg"
            >
              {isSearching ? '⏳ Searching...' : '🔎 Search'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'caseLaw' && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {searchResults.map((caseItem) => (
                  <div key={caseItem.id} className="card glass-hover border-l-4 border-blue-500 hover:border-blue-400 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">⚖️</span>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white hover:text-blue-400 transition">{caseItem.title}</h3>
                            <p className="text-blue-400 font-mono text-lg mt-1 flex items-center gap-2">
                              📑 {caseItem.citation}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-400 mb-3 ml-12">
                          <span className="flex items-center gap-1">🏛️ {caseItem.court}</span>
                          <span className="flex items-center gap-1">📅 {caseItem.year}</span>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-sm font-semibold shadow-lg">
                        {caseItem.relevance}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4 text-base ml-12 bg-slate-800/50 p-4 rounded-lg">{caseItem.summary}</p>
                    <div className="flex gap-3 ml-12">
                      <button
                        onClick={() => handleCopyToClipboard(caseItem.citation)}
                        className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        📋 Copy Citation
                      </button>
                      <button
                        onClick={() => handleCopyToClipboard(`${caseItem.title}\n${caseItem.citation}\n${caseItem.summary}`)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
                      >
                        📄 Copy Case Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-8xl mb-6">📚</div>
                <h3 className="text-3xl font-bold text-white mb-4">AI-Powered Case Law Research</h3>
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                  Search for Indian Supreme Court and High Court judgments using AI
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Fundamental Rights"); handleSearch(); }}>
                    <p className="text-blue-200 font-semibold mb-2 text-sm">Try searching:</p>
                    <p className="text-white text-lg font-bold">"Fundamental Rights"</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Article 21"); handleSearch(); }}>
                    <p className="text-purple-200 font-semibold mb-2 text-sm">Or by article:</p>
                    <p className="text-white text-lg font-bold">"Article 21"</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Kesavananda Bharati"); handleSearch(); }}>
                    <p className="text-green-200 font-semibold mb-2 text-sm">Or case name:</p>
                    <p className="text-white text-lg font-bold">"Kesavananda Bharati"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'statutes' && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((statute) => (
                  <div key={statute.id} className="card glass-hover border-l-4 border-green-500 hover:border-green-400 transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">📜</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 hover:text-green-400 transition">{statute.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-full text-sm font-semibold shadow-lg">
                            {statute.sections}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm bg-slate-800/50 p-4 rounded-lg">{statute.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {statute.keywords.split(',').map((keyword, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-xs border border-green-500/30">
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(`${statute.title}\n${statute.description}`)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg hover:from-green-700 hover:to-green-900 transition-all text-sm font-semibold shadow-lg flex items-center justify-center gap-2">
                      📋 Copy Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-8xl mb-6">📖</div>
                <h3 className="text-3xl font-bold text-white mb-4">Search Indian Statutes & Acts</h3>
                <p className="text-slate-400 text-lg mb-8">
                  Search for IPC sections, bare acts, and legal provisions from Indian Kanoon
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Indian Penal Code"); handleSearch(); }}>
                    <p className="text-green-200 font-semibold mb-2 text-sm">Try searching:</p>
                    <p className="text-white text-lg font-bold">"Indian Penal Code"</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Section 302 IPC"); handleSearch(); }}>
                    <p className="text-blue-200 font-semibold mb-2 text-sm">Or by section:</p>
                    <p className="text-white text-lg font-bold">"Section 302 IPC"</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Contract Act"); handleSearch(); }}>
                    <p className="text-purple-200 font-semibold mb-2 text-sm">Or by act:</p>
                    <p className="text-white text-lg font-bold">"Contract Act"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {searchResults.map((term, idx) => (
                  <div key={idx} className="card glass-hover border-l-4 border-purple-500 hover:border-purple-400 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">📖</span>
                        <h3 className="text-2xl font-bold text-white hover:text-purple-400 transition">{term.term}</h3>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                        {term.category}
                      </span>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                      <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{term.definition}</div>
                    </div>
                    <button
                      onClick={() => handleCopyToClipboard(`${term.term}: ${term.definition}`)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all text-sm font-semibold shadow-lg flex items-center justify-center gap-2"
                    >
                      📋 Copy Definition
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-8xl mb-6">📘</div>
                <h3 className="text-3xl font-bold text-white mb-4">AI-Powered Legal Dictionary</h3>
                <p className="text-slate-400 text-lg mb-8">
                  Get instant AI-generated definitions for legal terms, IPC sections, and concepts
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("IPC 302"); handleSearch(); }}>
                    <p className="text-purple-200 font-semibold mb-2 text-sm">Try searching:</p>
                    <p className="text-white text-lg font-bold">"IPC 302"</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Habeas Corpus"); handleSearch(); }}>
                    <p className="text-blue-200 font-semibold mb-2 text-sm">Or Latin terms:</p>
                    <p className="text-white text-lg font-bold">"Habeas Corpus"</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Mens Rea"); handleSearch(); }}>
                    <p className="text-green-200 font-semibold mb-2 text-sm">Or concepts:</p>
                    <p className="text-white text-lg font-bold">"Mens Rea"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Tips */}
        <div className="card mt-8 bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-yellow-500">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Research Tips</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Use specific keywords for more accurate results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Search by case name, citation, or legal principle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Citations can be directly inserted into your drafts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Bookmark frequently used statutes and cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>All research is saved in your history for future reference</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResearchPage;
