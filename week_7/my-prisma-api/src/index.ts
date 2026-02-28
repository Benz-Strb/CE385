import express from 'express';
import { prisma } from '../lib/prisma'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Prisma API!');
});

// get all users
app.get('/user', async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

// get user with email
app.get('/user/email/:email', async(req, res) => {
    const { email } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user by email' });
    }
});

// add user
app.post('/user', async(req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// update user
app.put('/user/:id', async(req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.update({
            where: { Userid: id },
            data: { name, email },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// delete user
app.delete('/user/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { Userid: id },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await prisma.user.delete({
            where: { Userid: id },
        });
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

//get all posts
app.get('/posts', async(req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' })
    }
});

// get post with id
app.get('/posts/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const post =await prisma.post.findUnique({
            where: { postId: id },
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch post by id' })
    }
});

// add post
app.post('/posts', async(req, res) => {
    const { title, content, authorId } = req.body
    try {
        const post = await prisma.post.create({
            data: { title, content, authorId },
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// update post
app.put('/posts/:id', async(req, res) => {
    const { id } = req.params;
    const { title, content, authorId } = req.body;
    try {
        const post = await prisma.post.update({
            where: { postId: id },
            data: { title, content, authorId },
        });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// delete post
app.delete('/posts/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { postId: id },
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await prisma.post.delete({
            where: { postId: id },
        });
        res.json({ message: 'Post deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
