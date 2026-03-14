import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Edit, Trash2 } from 'lucide-react';

const BlogCard = ({ blog, isOwner, onDelete }) => {
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="group flex flex-col justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                <img
                    src={blog.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2.5 py-1 rounded-full">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formattedDate}</span>
                        </div>
                        {blog.author && blog.author.name && (
                            <div className="flex items-center gap-2">
                                {blog.author.avatar ? (
                                    <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full object-cover border border-gray-200" />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                <span className="max-w-[100px] truncate text-sm text-gray-700 dark:text-gray-300">{blog.author.name}</span>
                            </div>
                        )}
                    </div>
                    {isOwner && (
                        <div className="flex gap-2">
                            <Link to={`/edit/${blog._id}`} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                            </Link>
                            <button onClick={() => onDelete(blog._id)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 text-sm leading-relaxed">
                    {blog.content}
                </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 mt-auto px-6 pb-6">
                <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors gap-1.5 group/link"
                >
                    Read article <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
