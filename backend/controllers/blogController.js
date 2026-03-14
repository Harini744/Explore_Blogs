const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email avatar').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email avatar');
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
    try {
        const { title, content, coverImage } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'User not found. Please log in again.' });
        }

        const blog = new Blog({
            title,
            content,
            coverImage: coverImage || undefined,
            author: req.user._id
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
    try {
        const { title, content, coverImage } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (blog) {
            // Check if user is the author
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'User not authorized to update this blog' });
            }

            blog.title = title || blog.title;
            blog.content = content || blog.content;
            if (coverImage) blog.coverImage = coverImage;

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            // Check if user is the author
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'User not authorized to delete this blog' });
            }

            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
