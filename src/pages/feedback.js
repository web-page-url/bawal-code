import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function FeedbackPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        experience: '',
        rating: 5,
        feedback: '',
        suggestions: '',
        wouldRecommend: 'yes'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    submitted_at: new Date().toISOString()
                }),
            });

            // Check if response is ok and has JSON content type
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(`Expected JSON, but received: ${contentType}. Response: ${text}`);
            }

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    experience: '',
                    rating: 5,
                    feedback: '',
                    suggestions: '',
                    wouldRecommend: 'yes'
                });
                
                // Scroll to top to show success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                console.error('Submission failed:', result.error);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const experienceOptions = [
        { value: 'beginner', label: 'शुरुआती (Beginner) - Programming में नया हूं' },
        { value: 'intermediate', label: 'मध्यम (Intermediate) - कुछ Experience है' },
        { value: 'advanced', label: 'एडवांस (Advanced) - Experienced Developer हूं' },
        { value: 'student', label: 'छात्र (Student) - Programming सीख रहा हूं' },
        { value: 'teacher', label: 'शिक्षक (Teacher) - Programming पढ़ाता हूं' }
    ];

    const ratingLabels = {
        1: 'बहुत खराब',
        2: 'खराब',
        3: 'ठीक है',
        4: 'अच्छा',
        5: 'बहुत अच्छा'
    };

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>Feedback - Bawal Code Programming Language</title>
                <meta name="description" content="Share your feedback and views about Bawal Code programming language. Help us improve!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <header className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-primary text-4xl md:text-5xl font-bold uppercase tracking-widest text-gradient hover:scale-105 transition-transform duration-300">
                            Bawal Code
                        </h1>
                    </Link>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                        आपकी राय महत्वपूर्ण है! 💭
                    </h2>
                    <p className="text-text-secondary text-lg mb-2">
                        Bawal Code के बारे में अपने विचार साझा करें
                    </p>
                    <p className="text-text-secondary">
                        Share your thoughts and help us improve Bawal Code
                    </p>
                </header>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 text-center">
                        <div className="text-2xl mb-2">🎉</div>
                        <h3 className="text-green-700 font-bold text-lg mb-2">धन्यवाद! Feedback Submit हो गया</h3>
                        <p className="text-green-600">आपकी राय हमारे लिए बहुत महत्वपूर्ण है। हम जल्द ही आपकी सुझावों पर काम करेंगे!</p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-center">
                        <div className="text-2xl mb-2">😔</div>
                        <h3 className="text-red-700 font-bold text-lg mb-2">कुछ गलत हुआ है</h3>
                        <p className="text-red-600">कृपया फिर से कोशिश करें या बाद में आएं।</p>
                    </div>
                )}

                {/* Main Form */}
                <div className="bg-surface rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-primary/20">
                        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                            📝 Feedback Form
                        </h3>
                        <p className="text-text-secondary mt-1">सभी फील्ड भरना जरूरी नहीं है</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-text-primary font-semibold mb-2">
                                    आपका नाम (Your Name) *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-text-primary placeholder-text-secondary"
                                    placeholder="अपना नाम लिखें..."
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                                    ईमेल (Email) *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-text-primary placeholder-text-secondary"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label htmlFor="experience" className="block text-text-primary font-semibold mb-2">
                                Programming Experience Level *
                            </label>
                            <select
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-text-primary"
                            >
                                <option value="">अपना level चुनें...</option>
                                {experienceOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-text-primary font-semibold mb-3">
                                Bawal Code को कितना Rate करेंगे? (1-5 Stars) *
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <label key={rating} className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={rating}
                                            checked={formData.rating === rating}
                                            onChange={(e) => handleInputChange({
                                                target: { name: 'rating', value: parseInt(e.target.value) }
                                            })}
                                            className="sr-only"
                                        />
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                                            formData.rating === rating
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-primary/20 bg-background text-text-secondary hover:border-primary/40'
                                        }`}>
                                            <div className="flex">
                                                {[...Array(rating)].map((_, i) => (
                                                    <span key={i} className="text-yellow-500">⭐</span>
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium">{ratingLabels[rating]}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Main Feedback */}
                        <div>
                            <label htmlFor="feedback" className="block text-text-primary font-semibold mb-2">
                                Bawal Code के बारे में आपकी राय क्या है? *
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleInputChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-text-primary placeholder-text-secondary resize-vertical"
                                placeholder="बताएं कि आपको Bawal Code कैसा लगा। क्या अच्छा लगा, क्या मुश्किल लगा, कोई समस्या आई...?"
                            />
                        </div>

                        {/* Suggestions */}
                        <div>
                            <label htmlFor="suggestions" className="block text-text-primary font-semibold mb-2">
                                सुधार के लिए सुझाव (Suggestions for Improvement)
                            </label>
                            <textarea
                                id="suggestions"
                                name="suggestions"
                                value={formData.suggestions}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-text-primary placeholder-text-secondary resize-vertical"
                                placeholder="कोई नए features चाहिए? कुछ बदलना चाहेंगे? Documentation में क्या जोड़ना चाहेंगे?"
                            />
                        </div>

                        {/* Recommendation */}
                        <div>
                            <label className="block text-text-primary font-semibold mb-3">
                                क्या आप Bawal Code को दूसरों को Recommend करेंगे? *
                            </label>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="wouldRecommend"
                                        value="yes"
                                        checked={formData.wouldRecommend === 'yes'}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                                        formData.wouldRecommend === 'yes'
                                            ? 'border-green-500 bg-green-500/10 text-green-700'
                                            : 'border-primary/20 bg-background text-text-secondary hover:border-primary/40'
                                    }`}>
                                        <span className="text-xl">👍</span>
                                        <span className="font-medium">हां, जरूर!</span>
                                    </div>
                                </label>

                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="wouldRecommend"
                                        value="maybe"
                                        checked={formData.wouldRecommend === 'maybe'}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                                        formData.wouldRecommend === 'maybe'
                                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-700'
                                            : 'border-primary/20 bg-background text-text-secondary hover:border-primary/40'
                                    }`}>
                                        <span className="text-xl">🤔</span>
                                        <span className="font-medium">शायद</span>
                                    </div>
                                </label>

                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="wouldRecommend"
                                        value="no"
                                        checked={formData.wouldRecommend === 'no'}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                                        formData.wouldRecommend === 'no'
                                            ? 'border-red-500 bg-red-500/10 text-red-700'
                                            : 'border-primary/20 bg-background text-text-secondary hover:border-primary/40'
                                    }`}>
                                        <span className="text-xl">👎</span>
                                        <span className="font-medium">नहीं</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-primary text-background px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-primary-dark hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                                        Submit कर रहे हैं...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        📤 Feedback Submit करें
                                    </span>
                                )}
                            </button>

                            <Link
                                href="/"
                                className="flex-none bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-primary hover:text-background hover:scale-105 text-center"
                            >
                                🏠 Home पर वापस जाएं
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-text-secondary">
                    <p className="mb-2">
                        🔒 आपकी जानकारी सुरक्षित है। हम आपका Email किसी के साथ Share नहीं करेंगे।
                    </p>
                    <p>
                        आपकी Feedback से हमें Bawal Code को बेहतर बनाने में मदद मिलेगी। 🙏
                    </p>
                </div>
            </div>
        </div>
    );
} 