const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const seedData = require('./seed.js/seed-data.json');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URLhttps://erjdvamdcghelpznpkfu.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyamR2YW1kY2doZWxwem5wa2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MzY2NzEsImV4cCI6MjAzMDMxMjY3MX0.iBhN5mXwdk_AJtPrNfCdKpu8DAMNKv_oRk9hZnlRtTcKEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.json());

// Routes
app.get('/api/posts', async (req, res) => {
    try {
        const { data: posts, error } = await supabase.from('posts').select('*');
        if (error) {
            throw error;
        }
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content, categoryId } = req.body;
        const { data, error } = await supabase.from('posts').insert([{ title, content, categoryId }]);
        if (error) {
            throw error;
        }
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const { data: posts, error } = await supabase.from('posts').select('*');
        if (error) {
            throw error;
        }
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { data: post, error } = await supabase.from('posts').select('*').eq('id', postId);
        if (error) {
            throw error;
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a post by ID
app.put('/api/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, categoryId } = req.body;
        const { data, error } = await supabase.from('posts').update({ title, content, categoryId }).eq('id', postId);
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a post by ID
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { data, error } = await supabase.from('posts').delete().eq('id', postId);
        if (error) {
            throw error;
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Routes for CRUD operations on categories

// Create a new category
app.post('/api/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const { data, error } = await supabase.from('categories').insert([{ name }]);
        if (error) {
            throw error;
        }
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const { data: categories, error } = await supabase.from('categories').select('*');
        if (error) {
            throw error;
        }
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single category by ID
app.get('/api/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { data: category, error } = await supabase.from('categories').select('*').eq('id', categoryId);
        if (error) {
            throw error;
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a category by ID
app.put('/api/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const { data, error } = await supabase.from('categories').update({ name }).eq('id', categoryId);
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a category by ID
app.delete('/api/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { data, error } = await supabase.from('categories').delete().eq('id', categoryId);
        if (error) {
            throw error;
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/posts/:id/like', async (req, res) => {
    try {
        const postId = req.params.id;
        // Increment the like count for the post in the database
        const updatedPost = await incrementLikeCount(postId);
        res.json({ likes: updatedPost.likes });
    } catch (error) {
        console.error('Error liking post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// server.js (continued)
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        // Delete the post from the database
        await deletePost(postId);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// server.js (continued)
app.get('/api/posts', async (req, res) => {
    try {
        const category = req.query.category;
        let posts;
        if (category) {
            // Fetch posts filtered by category
            posts = await fetchPostsByCategory(category);
        } else {
            // Fetch all posts
            posts = await fetchAllPosts();
        }
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Seed data route (for testing purposes)
app.post('/api/seed', async (req, res) => {
    try {
        // Seed categories
        const { data: seededCategories, error: categoryError } = await supabase.from('categories').insert(seedData.categories);
        if (categoryError) {
            throw categoryError;
        }

        // Seed posts
        const { data: seededPosts, error: postError } = await supabase.from('posts').insert(seedData.posts);
        if (postError) {
            throw postError;
        }

        res.json({ message: 'Seed data successfully inserted' });
    } catch (error) {
        console.error('Seed error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
