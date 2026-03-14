import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById } from '../services/api';
import { Loader2, ArrowLeft, Calendar, User } from 'lucide-react';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id);
                setBlog(data);
            } catch (err) {
                setError('Failed to fetch blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="text-center py-20">
                <div className="text-red-500 text-xl font-medium mb-4">{error || 'Blog not found'}</div>
                <button
                    onClick={() => navigate(-1)}
                    className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Go back
                </button>
            </div>
        );
    }

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className="max-w-4xl mx-auto py-8 lg:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 mb-6 gap-2 transition-colors group px-4 md:px-0"
            >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                Back to articles
            </Link>
            <header className="mb-10 lg:mb-14 border-b border-gray-200 dark:border-gray-800 pb-8 lg:pb-12 text-center md:text-left px-4 md:px-0">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-8">
                    {blog.title}
                </h1>

                <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 shadow-xl border border-white/20 dark:border-gray-700/50">
                    <img
                        src={blog.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-gray-500 dark:text-gray-400 mt-6">
                    {blog.author && blog.author.name && (
                        <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full font-medium border border-gray-200 dark:border-gray-700 shadow-sm">
                            {blog.author.avatar ? (
                                <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                            ) : (
                                <User className="w-5 h-5 text-primary-500" />
                            )}
                            <span className="text-gray-900 dark:text-gray-200">{blog.author.name}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                        <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none prose-p:leading-loose text-gray-700 dark:text-gray-300 whitespace-pre-wrap px-4 md:px-0">
                {blog.content}
            </div>
        </article >
    );
};

export default BlogDetails;
