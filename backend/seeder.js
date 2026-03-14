const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Blog = require('./models/Blog');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear Existing Data
        await Blog.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');

        // Create Seed User
        const createdUsers = await User.create([
            {
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password123',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
            },
            {
                name: 'John Smith',
                email: 'john@example.com',
                password: 'password123',
                avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150'
            },
            {
                name: 'Alex Johnson',
                email: 'alex@example.com',
                password: 'password123',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'
            }
        ]);

        const janeId = createdUsers[0]._id;
        const johnId = createdUsers[1]._id;
        const alexId = createdUsers[2]._id;

        // Create Seed Blogs
        await Blog.create([
            {
                title: 'The Future of Web Development in 2026',
                content: 'Web development is constantly evolving. In 2026, we are seeing a massive shift towards edge computing, AI-driven development tools, and new paradigms in frontend architectures like Server Components. As developers, adapting to these changes is not just an option but a necessity to stay relevant.\n\nHere are some key trends to watch:\n1. AI integration everywhere.\n2. WASM becoming mainstream.\n3. The rise of hyper-personalized UI.',
                coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
                author: janeId
            },
            {
                title: 'Mastering the MERN Stack: A Comprehensive Guide',
                content: 'The MERN stack (MongoDB, Express, React, Node.js) remains one of the most popular and powerful stacks for building full-stack applications. Its all-JavaScript nature allows developers to seamlessly transition between frontend and backend, increasing productivity and consistency.\n\nIn this guide, we explore the best practices for structuring your MERN applications, handling authentication securely using JWT, and deploying your app for production.',
                coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000',
                author: johnId
            },
            {
                title: 'Designing Beautiful UIs with Tailwind CSS',
                content: 'Tailwind CSS has revolutionized the way we style web applications. By utilizing utility classes, we can build custom designs rapidly without leaving our HTML or JSX. It encourages a highly constrained and scalable design system straight out of the box.\n\nLet\'s talk about how to implement glassmorphism, smooth animations, and responsive layouts that look spectacular on any device.',
                coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000',
                author: janeId
            },
            {
                title: '10 Things I Wish I Knew Before Starting React',
                content: 'React can be incredibly daunting when you are first starting out. Between hooks, custom context, state management, and props drilling, it can quickly get overwhelming.\n\nHere are the top things I wish someone had explained to me when I wrote my first functional component:\n- The useEffect dependency array is a strict contract.\n- Context is not a replacement for Redux/Zustand if used heavily.\n- Performance matters, but do not prematurely optimize.',
                coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000',
                author: alexId
            },
            {
                title: 'Exploring the Real Power of MongoDB Aggregation',
                content: 'Most developers only use `.find()` and `.findOne()`. But MongoDB has an incredibly powerful aggregation framework that can perform highly complex analytical queries directly in the database logic.\n\nBy leveraging pipelines like `$match`, `$group`, and `$lookup`, you can construct complex joins and map-reduce queries easily without straining your Node.js application server memory.',
                coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000',
                author: johnId
            },
            {
                title: 'How to Secure Your Node.js API',
                content: 'Security is a non-negotiable metric when building any web application. If you are building APIs using Node and Express, there are a few must-do steps to ensure your users’ data is safe.\n\nAlways use helmet to secure HTTP headers. Use express-rate-limit to prevent brute force attacks. Always sanitize inputs to prevent NoSQL injection, and finally, correctly configure CORS to restrict who can talk to your server.',
                coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=2000',
                author: alexId
            },
            {
                title: 'Why Vite is Replacing Create React App',
                content: 'For years, CRA was the gold standard for spinning up a new React client. But Vite uses native ES modules to instantly start a development server and provides near-instantaneous hot module replacement (HMR).\n\nIf you haven\'t switched your side projects to Vite yet, the developer experience alone is worth the 5-minute migration time.',
                coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2000',
                author: janeId
            },
            {
                title: 'Understanding Javascript Closures Once and For All',
                content: 'Closures are one of the key pillars of JavaScript that trips up almost every junior developer in an interview. \n\nSimply put: a closure gives you access to an outer function\'s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time. This opens up incredible patterns for data privacy and currying.',
                coverImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=2000',
                author: johnId
            },
            {
                title: 'Building Responsive Layouts using CSS Grid',
                content: 'While Flexbox is amazing for 1-dimensional layouts, CSS Grid is built for 2-dimensional layouts (rows and columns). \n\nWith just a few lines of CSS (like `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`), you can create a perfectly responsive card layout that requires absolutely zero media queries. CSS has truly matured.',
                coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=2000',
                author: alexId
            },
            {
                title: 'The Art of Writing Clean Code',
                content: '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler.\n\nClean code means readable, simple, and self-documenting logic. It means using meaningful variable names instead of `xyz123`. It means your functions should do one thing, and do it well. In the grand scheme of maintaining software, writing code takes minimal time compared to reading it later.',
                coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=2000',
                author: janeId
            }
        ]);

        console.log('10 Awesome Blogs Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
