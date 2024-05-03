// seed.js

const { createClient } = require('@supabase/supabase-js');
const seedData = require('./seed-data.json');

// Initialize Supabase client
const supabaseUrl = 'https://erjdvamdcghelpznpkfu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyamR2YW1kY2doZWxwem5wa2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MzY2NzEsImV4cCI6MjAzMDMxMjY3MX0.iBhN5mXwdk_AJtPrNfCdKpu8DAMNKv_oRk9hZnlRtTc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Seed function
const seed = async () => {
    try {
        // Seed categories
        const { data: seededCategories, error: categoryError } = await supabase.from('categories').insert(seedData.categories);
        if (categoryError) {
            throw categoryError;
        }
        console.log('Categories seeded:', seededCategories);

        // Seed posts
        const { data: seededPosts, error: postError } = await supabase.from('posts').insert(seedData.posts);
        if (postError) {
            throw postError;
        }
        console.log('Posts seeded:', seededPosts);

        console.log('Seed data successfully inserted');
    } catch (error) {
        console.error('Seed error:', error);
    }
};

// Call seed function
seed();
