import { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import BlogCard from '../components/BlogCard';
import { Loader2 } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data);
            } catch (err) {
                setError('Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 mt-10 p-4 bg-red-50 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl mb-4">
                    Latest Insights
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover stories, thinking, and expertise from writers on any topic.
                </p>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No blogs found. Be the first to write one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} isOwner={false} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
