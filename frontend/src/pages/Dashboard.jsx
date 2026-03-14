import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import { Loader2, PlusCircle } from 'lucide-react';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMyBlogs();
    }, [user._id]);

    const fetchMyBlogs = async () => {
        try {
            setLoading(true);
            const data = await getBlogs();
            // Filter blogs to only show user's blogs
            const userBlogs = data.filter((blog) => blog.author._id === user._id);
            setBlogs(userBlogs);
        } catch (err) {
            setError('Failed to fetch your blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlog(id);
                setBlogs(blogs.filter((blog) => blog._id !== id));
            } catch (err) {
                alert('Failed to delete blog');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Your Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your stories and publications.</p>
                </div>
                <Link
                    to="/create"
                    className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-primary-700 gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    Write new post
                </Link>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                    {error}
                </div>
            )}

            {blogs.length === 0 ? (
                <div className="text-center py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full flex items-center justify-center mb-4">
                        <PlusCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-base mb-6 max-w-sm">You haven't published any stories yet. Write your first post to share with the world.</p>
                    <Link
                        to="/create"
                        className="inline-flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 px-5 py-2.5 text-sm font-medium text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                    >
                        Create your first post
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            isOwner={true}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
