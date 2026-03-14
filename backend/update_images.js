const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const updateBlogImage = async () => {
    try {
        const blogTitleRegex = new RegExp('the art of writing clean code', 'i');
        const aiBlogRegex = new RegExp('ai clean coding', 'i');

        const cleanCodeResult = await Blog.updateMany(
            { title: { $regex: blogTitleRegex } },
            { $set: { coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2000' } }
        );

        const aiBlogResult = await Blog.updateMany(
            { title: { $regex: aiBlogRegex } },
            { $set: { coverImage: 'https://images.unsplash.com/photo-1620712948343-005691abfb34?auto=format&fit=crop&q=80&w=2000' } }
        );

        console.log(`Updated The Art of Writing Clean Code: ${cleanCodeResult.modifiedCount} documents.`);
        console.log(`Updated AI Clean Coding: ${aiBlogResult.modifiedCount} documents.`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateBlogImage();
