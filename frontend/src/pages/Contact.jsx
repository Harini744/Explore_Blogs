import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMsg('Your message has been sent successfully. We will get back to you soon!');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setSuccessMsg('');
            }, 5000);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
                    Get in touch
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    We'd love to hear from you. Please fill out this form or use our contact information below.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div className="glass rounded-2xl p-8 h-full shadow-xl dark:bg-gray-800/80 dark:border-gray-700/50">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start text-gray-600 dark:text-gray-400">
                                <div className="flex-shrink-0">
                                    <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div className="ml-4 text-base">
                                    <p className="font-medium text-gray-900 dark:text-gray-200">Email Us</p>
                                    <p className="mt-1">support@mernblog.com</p>
                                </div>
                            </div>

                            <div className="flex items-start text-gray-600 dark:text-gray-400">
                                <div className="flex-shrink-0">
                                    <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div className="ml-4 text-base">
                                    <p className="font-medium text-gray-900 dark:text-gray-200">Call Us</p>
                                    <p className="mt-1">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start text-gray-600 dark:text-gray-400">
                                <div className="flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div className="ml-4 text-base">
                                    <p className="font-medium text-gray-900 dark:text-gray-200">Visit Us</p>
                                    <p className="mt-1">123 Tech Avenue, Suite 100<br />San Francisco, CA 94107</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm tracking-wide text-gray-500 dark:text-gray-400 uppercase font-semibold mb-4">Follow Us</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="glass rounded-2xl p-8 shadow-xl dark:bg-gray-800/80 dark:border-gray-700/50">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h3>

                        {successMsg && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl flex items-center gap-3">
                                <div className="bg-green-100 rounded-full p-1 border border-green-200">
                                    <Send className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="font-medium text-sm">{successMsg}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all resize-y bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex justify-center items-center py-3 px-8 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2 w-full md:w-auto"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
