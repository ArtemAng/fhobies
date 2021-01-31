const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const { cloudinary } = require('./cloud');
//models
const Collection = require('./models/Collection');
const Item = require('./models/Item');
const Comment = require('./models/Comment');
const Category = require('./models/Category');
const User = require('./models/User');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    res.send('api')
});
app.use(express.json({ extended: true, limit: '50mb' }));

io.on('connection', socket => {
    //gets
    socket.on('get-collections', async () => {
        const collections = await Collection.find();
        socket.emit('collections', collections);
    });

    socket.on('get-category-by-id', async (id) => {
        if (!id) {
            socket.emit('category-by-id',[]);

        }
        else {
            const category = await Category.findOne({ _id: id });
            socket.emit('category-by-id', category.props);
        }

    })

    socket.on('get-items', async () => {
        const items = await Item.find();
        socket.emit('items', items);
    });

    socket.on('get-comments', async () => {
        const comments = await Comment.find();
        socket.emit('comments', comments);
    });

    socket.on('get-categories', async () => {
        const categories = await Category.find();
        socket.emit('categories', categories);
    });

    //add
    socket.on('add-post', async () => {
        const collections = await Collection.find();
        socket.broadcast.emit('collections', collections);
    });

    socket.on('add-comment', async (data) => {
        const { itemId, userId, text } = data;
        const comment = await new Comment({ userId, text, itemId });
        await comment.save();
        const comments = await Comment.find();
        socket.broadcast.emit('comments', comments);
        socket.emit('comments', comments);
    });

    socket.on('add-category', async (data) => {
        const { name, props } = data;
        const newCategory = await new Category({ name, props });
        await newCategory.save();
        const categories = await Comment.find();
        socket.emit('categories', categories);
    });

    socket.on('add-item', async (data) => {
        const item = await new Item({ ...data, likes: [] });
        await item.save();
        const items = await Item.find();
        socket.broadcast.emit('items', items);
        socket.emit('items', items);
    });

    socket.on('like-item', async (data) => {
        const { userId, itemId } = data;
        const item = await Item.findById({ _id: itemId });
        const candidate = item.likes.indexOf(userId);
        if (candidate !== -1)
            item.likes.splice(candidate, 1);
        else
            item.likes.push(userId);
        await item.save();
        const items = await Item.find();
        socket.broadcast.emit('items', items);
        socket.emit('items', items);
    });
    //dells
    socket.on('del-collection', async (data) => {
        const { postIdx } = data;
        const delCollection = await Collection.findOneAndRemove({ _id: postIdx });
        delCollection.save();
        const collections = await Collection.find();
        socket.broadcast.emit('collections', collections);
        socket.emit('collections', collections);
    });

    socket.on('del-item', async (data) => {
        const { itemId } = data;
        const delItem = await Item.findOneAndRemove({ _id: itemId });
        delItem.save();
        const items = await Item.find();
        socket.emit('items', items);
        socket.broadcast.emit('items', items);
    });

    socket.on('del-comment', async (data) => {
        const { commentId } = data;
        const delComment = await Comment.findOneAndRemove({ _id: commentId });
        delComment.save();
        const comments = await Comment.find();
        socket.emit('comments', comments);
        socket.broadcast.emit('comments', comments);
    });


});

// app.use(cors());
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/posts', require('./routes/posts.routes.js'));
app.use('/api/collections', require('./routes/collections.routes.js'));
app.use('/api/hobies', require('./routes/hobies.routes.js'));
app.use('/api/comments', require('./routes/comments.routes.js'));
app.use('/api/collectionitems', require('./routes/collectionItems.routes.js'));
app.use('/api/categories', require('./routes/categories.routes.js'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Artem:aaa123@cluster0.qj5z6.mongodb.net/fhobies?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Conected to database.');
})

http.listen(1337, () => console.log('Server started on port 1337'));



