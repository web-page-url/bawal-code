import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllFeedback } from '../../lib/supabase';

export default function AdminDashboard() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        averageRating: 0,
        recommendations: { yes: 0, maybe: 0, no: 0 },
        experiences: {}
    });
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        setLoading(true);
        try {
            const result = await getAllFeedback();
            if (result.success) {
                setFeedbacks(result.data);
                calculateStats(result.data);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const total = data.length;
        const averageRating = total > 0 
            ? (data.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1) 
            : "0.0";
        
        const recommendations = data.reduce((acc, item) => {
            acc[item.would_recommend] = (acc[item.would_recommend] || 0) + 1;
            return acc;
        }, {});

        const experiences = data.reduce((acc, item) => {
            acc[item.experience] = (acc[item.experience] || 0) + 1;
            return acc;
        }, {});

        setStats({
            total,
            averageRating,
            recommendations,
            experiences
        });
    };


    const getFilteredAndSortedFeedback = () => {
        let filtered = [...feedbacks];

        // Apply filter
        if (filter !== 'all') {
            if (['1', '2', '3', '4', '5'].includes(filter)) {
                filtered = filtered.filter(fb => fb.rating === parseInt(filter));
            } else if (['yes', 'maybe', 'no'].includes(filter)) {
                filtered = filtered.filter(fb => fb.would_recommend === filter);
            } else {
                filtered = filtered.filter(fb => fb.experience === filter);
            }
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'oldest':
                    return new Date(a.created_at) - new Date(b.created_at);
                case 'rating-high':
                    return b.rating - a.rating;
                case 'rating-low':
                    return a.rating - b.rating;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRatingStars = (rating) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const getRecommendationBadge = (recommendation) => {
        const badges = {
            yes: { emoji: '👍', text: 'हां, जरूर!', color: 'bg-green-500' },
            maybe: { emoji: '🤔', text: 'शायद', color: 'bg-yellow-500' },
            no: { emoji: '👎', text: 'नहीं', color: 'bg-red-500' }
        };
        const badge = badges[recommendation] || badges.maybe;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium ${badge.color}`}>
                <span>{badge.emoji}</span>
                {badge.text}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-primary text-lg">Feedback load कर रहे हैं...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md">
                    <div className="text-4xl mb-4">😔</div>
                    <h2 className="text-red-700 font-bold text-xl mb-2">Error Loading Feedback</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchFeedback}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const filteredFeedback = getFilteredAndSortedFeedback();

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>Admin Dashboard - Bawal Code Feedback</title>
                <meta name="description" content="Admin dashboard to view user feedback for Bawal Code" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Bawal Code admin, dashboard, feedback management, analytics, user statistics" />
                <meta name="author" content="Anubhav Chaudhary" />
                <meta name="robots" content="noindex, nofollow" />

                {/* Open Graph Meta Tags for Facebook, WhatsApp */}
                <meta property="og:title" content="Admin Dashboard - Bawal Code Management" />
                <meta property="og:description" content="Administrative interface for managing Bawal Code user feedback and analytics." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bawal-code.vercel.app/admin/dashboard" />
                <meta property="og:image" content="https://bawal-code.vercel.app/Bawal-code-1.0.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Admin Dashboard - Bawal Code Management" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Bawal Code" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Admin Dashboard - Bawal Code Management" />
                <meta name="twitter:description" content="Administrative interface for Bawal Code feedback and user management." />
                <meta name="twitter:image" content="https://bawal-code.vercel.app/Bawal-code-1.0.png" />
                <meta name="twitter:image:alt" content="Admin Dashboard - Bawal Code Management" />
                <meta name="twitter:site" content="@BawalCode" />
                <meta name="twitter:creator" content="@AnubhavChaudhary" />

                {/* Additional meta tags for better sharing */}
                <meta property="article:author" content="Anubhav Chaudhary" />
                <meta property="article:section" content="Administration" />
                <meta property="article:tag" content="Bawal Code, Admin, Dashboard, Management, Analytics" />

                {/* Favicon */}
                <link rel="icon" href="/Bawal-code-1.0.png" />
                <link rel="apple-touch-icon" href="/Bawal-code-1.0.png" />
                <link rel="shortcut icon" href="/Bawal-code-1.0.png" />
            </Head>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <header className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-primary text-4xl md:text-5xl font-bold uppercase tracking-widest text-gradient hover:scale-105 transition-transform duration-300">
                            Bawal Code
                        </h1>
                    </Link>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                        📊 Admin Dashboard - User Feedback
                    </h2>
                    <p className="text-text-secondary">
                        सभी users का feedback और statistics देखें
                    </p>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-2">📝</div>
                        <h3 className="text-primary font-bold text-xl">{stats.total}</h3>
                        <p className="text-text-secondary">Total Feedback</p>
                    </div>

                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-2">⭐</div>
                        <h3 className="text-primary font-bold text-xl">{stats.averageRating}</h3>
                        <p className="text-text-secondary">Average Rating</p>
                    </div>

                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-2">👍</div>
                        <h3 className="text-primary font-bold text-xl">{stats.recommendations.yes || 0}</h3>
                        <p className="text-text-secondary">Recommendations</p>
                    </div>

                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-2">🔄</div>
                        <button 
                            onClick={fetchFeedback}
                            className="text-primary font-bold text-lg hover:text-primary-dark transition-colors"
                        >
                            Refresh
                        </button>
                        <p className="text-text-secondary">Update Data</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <label className="block text-text-primary font-semibold mb-2 text-sm">Filter by:</label>
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-primary/30 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Feedback</option>
                                    <optgroup label="Rating">
                                        <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                                        <option value="4">⭐⭐⭐⭐☆ (4 Stars)</option>
                                        <option value="3">⭐⭐⭐☆☆ (3 Stars)</option>
                                        <option value="2">⭐⭐☆☆☆ (2 Stars)</option>
                                        <option value="1">⭐☆☆☆☆ (1 Star)</option>
                                    </optgroup>
                                    <optgroup label="Recommendation">
                                        <option value="yes">👍 Yes</option>
                                        <option value="maybe">🤔 Maybe</option>
                                        <option value="no">👎 No</option>
                                    </optgroup>
                                    <optgroup label="Experience">
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </optgroup>
                                </select>
                            </div>

                            <div>
                                <label className="block text-text-primary font-semibold mb-2 text-sm">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-primary/30 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="rating-high">Highest Rating</option>
                                    <option value="rating-low">Lowest Rating</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="text-text-secondary">
                            Showing <span className="font-bold text-primary">{filteredFeedback.length}</span> of <span className="font-bold text-primary">{stats.total}</span> feedback
                        </div>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="space-y-6">
                    {filteredFeedback.length === 0 ? (
                        <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-text-primary font-bold text-xl mb-2">No Feedback Found</h3>
                            <p className="text-text-secondary">Try adjusting your filters or check back later!</p>
                        </div>
                    ) : (
                        filteredFeedback.map((feedback, index) => (
                            <div key={feedback.id} className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Left Column - User Info & Rating */}
                                    <div className="lg:w-1/3">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                                                {feedback.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-text-primary font-bold text-lg">{feedback.name}</h3>
                                                <p className="text-text-secondary text-sm mb-2">{feedback.email}</p>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-yellow-500 text-lg">{getRatingStars(feedback.rating)}</span>
                                                    <span className="text-text-secondary text-sm">({feedback.rating}/5)</span>
                                                </div>
                                                <div className="mb-2">
                                                    {getRecommendationBadge(feedback.would_recommend)}
                                                </div>
                                                <div className="text-text-secondary text-sm">
                                                    <span className="capitalize">{feedback.experience}</span> • {formatDate(feedback.created_at)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Feedback Content */}
                                    <div className="lg:w-2/3">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-text-primary font-semibold mb-2 flex items-center gap-2">
                                                    💭 Feedback:
                                                </h4>
                                                <div className="bg-background rounded-lg p-4 border border-primary/20">
                                                    <p className="text-text-primary leading-relaxed">{feedback.feedback}</p>
                                                </div>
                                            </div>

                                            {feedback.suggestions && (
                                                <div>
                                                    <h4 className="text-text-primary font-semibold mb-2 flex items-center gap-2">
                                                        💡 Suggestions:
                                                    </h4>
                                                    <div className="bg-background rounded-lg p-4 border border-primary/20">
                                                        <p className="text-text-primary leading-relaxed">{feedback.suggestions}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-12 pt-8 border-t border-primary/20">
                    <Link
                        href="/"
                        className="bg-primary text-background px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-primary-dark hover:scale-105 shadow-lg inline-flex items-center gap-2 mb-4"
                    >
                        🏠 Back to Home
                    </Link>
                    <p className="text-text-secondary">
                        Admin Dashboard for Bawal Code v2.0
                    </p>
                </div>
            </div>
        </div>
    );
} 