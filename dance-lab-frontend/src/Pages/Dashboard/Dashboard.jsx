import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FaHeart } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Dashboard = () => {
    const [analyses, setAnalyses] = useState([]);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [likedFeedbacks, setLikedFeedbacks] = useState(new Set());

    const API_URL = 'http://localhost:8081/api/analysis';

    useEffect(() => {
        fetchAnalyses();
    }, []);

    const handleLike = (analysisId) => {
        setLikedFeedbacks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(analysisId)) {
                newSet.delete(analysisId);
            } else {
                newSet.add(analysisId);
            }
            return newSet;
        });
    };

    const fetchAnalyses = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setAnalyses(data);
        } catch (err) {
            setError('Failed to fetch analyses');
        } finally {
            setLoading(false);
        }
    };

    const filteredAnalyses = analyses.filter(analysis => {
        const matchesFilter = filter === 'all' || 
            (filter === 'shared' && analysis.shared) || 
            (filter === 'private' && !analysis.shared);
        
        const matchesSearch = searchQuery === '' || 
            analysis.userName.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const downloadAnalysis = (analysis) => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(20);
        doc.text('Dance Analysis Report', 20, 20);
        
        // Add analysis details
        doc.setFontSize(12);
        doc.text(`Routine Title: ${analysis.routineTitle}`, 20, 40);
        doc.text(`User Name: ${analysis.userName}`, 20, 50);
        doc.text(`Submitted At: ${new Date(analysis.submittedAt).toLocaleString()}`, 20, 60);
        doc.text(`Shared: ${analysis.shared ? 'Yes' : 'No'}`, 20, 70);
        
        // Add analysis result
        doc.text('Analysis Result:', 20, 90);
        const splitText = doc.splitTextToSize(analysis.analysisResult, 170);
        doc.text(splitText, 20, 100);
        
        // Add feedback if exists
        if (analysis.feedback) {
            const yPos = doc.previousAutoTable.finalY || 100;
            doc.text('Feedback:', 20, yPos + 20);
            const feedbackSplit = doc.splitTextToSize(analysis.feedback, 170);
            doc.text(feedbackSplit, 20, yPos + 30);
        }
        
        doc.save(`dance-analysis-${analysis.routineTitle.replace(/\s+/g, '-')}.pdf`);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dance Analysis Dashboard</h1>
                <div className="dashboard-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by username..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-controls">
                        <button 
                            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Analyses
                        </button>
                        <button 
                            className={`filter-button ${filter === 'shared' ? 'active' : ''}`}
                            onClick={() => setFilter('shared')}
                        >
                            Shared Analyses
                        </button>
                        <button 
                            className={`filter-button ${filter === 'private' ? 'active' : ''}`}
                            onClick={() => setFilter('private')}
                        >
                            Private Analyses
                        </button>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading analyses...</div>
            ) : (
                <div className="analyses-grid">
                    {filteredAnalyses.map(analysis => (
                        <div key={analysis.id} className="analysis-card">
                            <div className="card-header">
                                <h2>{analysis.routineTitle}</h2>
                                <span className={`status-badge ${analysis.shared ? 'shared' : 'private'}`}>
                                    {analysis.shared ? 'Shared' : 'Private'}
                                </span>
                            </div>
                            
                            <div className="card-content">
                                <div className="info-row">
                                    <span className="label">User:</span>
                                    <span className="value">{analysis.userName}</span>
                                </div>
                                
                                <div className="info-row">
                                    <span className="label">Analysis Result:</span>
                                    <p className="value">{analysis.analysisResult}</p>
                                </div>
                                
                                {analysis.feedback && (
                                    <div className="info-row">
                                        <span className="label">Feedback:</span>
                                        <div className="feedback-container">
                                            <p className="value">{analysis.feedback}</p>
                                            <button 
                                                className={`like-button ${likedFeedbacks.has(analysis.id) ? 'liked' : ''}`}
                                                onClick={() => handleLike(analysis.id)}
                                            >
                                                <FaHeart />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="info-row">
                                    <span className="label">Submitted:</span>
                                    <span className="value">{formatDate(analysis.submittedAt)}</span>
                                </div>

                                <div className="card-actions">
                                    <button 
                                        className="download-button"
                                        onClick={() => downloadAnalysis(analysis)}
                                    >
                                        Download Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredAnalyses.length === 0 && (
                <div className="no-results">
                    <p>No analyses found matching the current filter.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;