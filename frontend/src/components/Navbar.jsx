import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut, Menu, X, PlusCircle, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="glass sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors" />
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                Explore_Blogs
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                        <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"><User className="w-4 h-4" /> Dashboard</Link>
                                <Link to="/create" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"><PlusCircle className="w-4 h-4" /> Write</Link>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 shadow transition-colors hover:bg-gray-800 dark:hover:bg-white gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                                <Link to="/register" className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-500">Sign up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden absolute w-full bg-white border-b border-gray-200">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/contact" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                                <Link to="/create" className="block px-4 py-2 text-base font-medium text-primary-600 hover:text-primary-800 hover:bg-gray-50 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><PlusCircle className="w-5 h-5" /> Write a Post</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <LogOut className="h-5 w-5" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                <Link to="/register" className="block px-4 py-2 text-base font-medium text-primary-600 hover:text-primary-800 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
