import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogById, updateBlog } from '../services/api';
import { Loader2 } from 'lucide-react';

const EditBlog = () => {
    const [formData, setFormData] = useState({ title: '', content: '', coverImage: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blog = await getBlogById(id);
                setFormData({ title: blog.title, content: blog.content, coverImage: blog.coverImage || '' });
            } catch (err) {
                setError('Failed to fetch blog details');
            } finally {
                setIsFetching(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await updateBlog(id, formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update blog');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Edit post</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Update and refine your existing publication.</p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-10 shadow-xl dark:bg-gray-800/80 dark:border-gray-700/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-base transition-all font-medium bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows="12"
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-base transition-all leading-relaxed bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Cover Image URL (Optional)
                        </label>
                        <input
                            type="url"
                            id="coverImage"
                            name="coverImage"
                            placeholder="https://images.unsplash.com/photo-..."
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-base transition-all font-medium bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                            value={formData.coverImage}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex justify-center px-8 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                        >
                            {isLoading ? 'Saving changes...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
