import React, { useState, useEffect } from 'react';
import './AnalysisManagement.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AnalysisManagement = () => {
    const [analyses, setAnalyses] = useState([]);
    const [formData, setFormData] = useState({
        routineTitle: '',
        userName: '',
        analysisResult: '',
        feedback: '',
        shared: false
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const API_URL = 'http://localhost:9090/api/analysis';

    useEffect(() => {
        fetchAnalyses();
    }, []);

    const fetchAnalyses = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setAnalyses(data);
        } catch (err) {
            setError('Failed to fetch analyses');
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredAnalyses = analyses.filter(analysis => 
        analysis.userName.toLowerCase().includes(searchQuery)
    );

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'userName') {
            if (/^[a-zA-Z\s]*$/.test(value)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
                setUserNameError('');
            } else {
                setUserNameError('User name can only contain letters');
                return;
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (userNameError) {
            return;
        }

        try {
            const url = editingId ? `${API_URL}/${editingId}` : API_URL;
            const method = editingId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Operation failed');
            }

            await fetchAnalyses();
            resetForm();
        } catch (err) {
            setError('Failed to save analysis');
        }
    };

    const handleEdit = (analysis) => {
        setFormData({
            routineTitle: analysis.routineTitle,
            userName: analysis.userName,
            analysisResult: analysis.analysisResult,
            feedback: analysis.feedback,
            shared: analysis.shared
        });
        setEditingId(analysis.id);
        setUserNameError('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this analysis?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete analysis');
                }

                await fetchAnalyses();
            } catch (err) {
                setError('Failed to delete analysis');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            routineTitle: '',
            userName: '',
            analysisResult: '',
            feedback: '',
            shared: false
        });
        setEditingId(null);
        setUserNameError('');
    };

    const downloadAnalysis = (analysis) => {
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('Dance Analysis Report', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Routine Title: ${analysis.routineTitle}`, 20, 40);
        doc.text(`User Name: ${analysis.userName}`, 20, 50);
        doc.text(`Submitted At: ${new Date(analysis.submittedAt).toLocaleString()}`, 20, 60);
        doc.text(`Shared: ${analysis.shared ? 'Yes' : 'No'}`, 20, 70);
        
        doc.text('Analysis Result:', 20, 90);
        const splitText = doc.splitTextToSize(analysis.analysisResult, 170);
        doc.text(splitText, 20, 100);

        if (analysis.feedback) {
            doc.text('Feedback:', 20, 110 + splitText.length * 5);
            const feedbackSplit = doc.splitTextToSize(analysis.feedback, 170);
            doc.text(feedbackSplit, 20, 120 + splitText.length * 5);
        }
        
        doc.save(`dance-analysis-${analysis.routineTitle.replace(/\s+/g, '-')}.pdf`);
    };

    const downloadAllAnalyses = () => {
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('Dance Analysis Summary Report', 20, 20);
        
        const tableData = analyses.map(analysis => [
            analysis.routineTitle,
            analysis.userName,
            analysis.analysisResult.substring(0, 50) + '...',
            analysis.feedback ? analysis.feedback.substring(0, 50) + '...' : 'N/A',
            analysis.shared ? 'Yes' : 'No',
            new Date(analysis.submittedAt).toLocaleString()
        ]);
        
        doc.autoTable({
            head: [['Routine Title', 'User Name', 'Analysis Result', 'Feedback', 'Shared', 'Submitted At']],
            body: tableData,
            startY: 40,
            theme: 'grid',
            headStyles: { fillColor: [105, 4, 245] },
            styles: { fontSize: 8 }
        });
        
        doc.save('dance-analyses-summary.pdf');
    };

    return (
        <div className="analysis-management">
            <h1>Dance Analysis Management</h1>
            
            {error && <div className="error-message">{error}</div>}

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            <div className="download-all-container">
                <button 
                    className="download-all-button"
                    onClick={downloadAllAnalyses}
                    disabled={analyses.length === 0}
                >
                    Download All Reports
                </button>
            </div>

            <form onSubmit={handleSubmit} className="analysis-form">
                <div className="form-group">
                    <label>Routine Title:</label>
                    <input
                        type="text"
                        name="routineTitle"
                        value={formData.routineTitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>User Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                        className={userNameError ? 'error-input' : ''}
                    />
                    {userNameError && <div className="validation-error">{userNameError}</div>}
                </div>

                <div className="form-group">
                    <label>Analysis Result:</label>
                    <textarea
                        name="analysisResult"
                        value={formData.analysisResult}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Feedback:</label>
                    <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="shared"
                            checked={formData.shared}
                            onChange={handleInputChange}
                        />
                        Shared
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={!!userNameError}>
                        {editingId ? 'Update Analysis' : 'Add Analysis'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="analyses-list">
                <h2>Existing Analyses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Routine Title</th>
                            <th>User Name</th>
                            <th>Analysis Result</th>
                            <th>Feedback</th>
                            <th>Shared</th>
                            <th>Submitted At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAnalyses.map(analysis => (
                            <tr key={analysis.id}>
                                <td>{analysis.routineTitle}</td>
                                <td>{analysis.userName}</td>
                                <td>{analysis.analysisResult}</td>
                                <td>{analysis.feedback}</td>
                                <td>{analysis.shared ? 'Yes' : 'No'}</td>
                                <td>{new Date(analysis.submittedAt).toLocaleString()}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="edit-button"
                                            onClick={() => handleEdit(analysis)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(analysis.id)}
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            className="download-button"
                                            onClick={() => downloadAnalysis(analysis)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalysisManagement;
