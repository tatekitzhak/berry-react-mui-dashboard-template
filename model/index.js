const Record2 = require('./schemas/record2');
const Record = require('./schemas/record');
const Subdocument = require('./schemas/subdocument');
const BlogPost = require('./blog/post');
const Comment = require('./blog/comment');


module.exports = {
    async record() {

        const rec = await Record.findOne({ name: 'a1' });
        rec.specials = [
            'aa',
            'bb',
            'cc'
        ];

        await rec.save(function (error, rec) {
            if (error)
                return console.log('error Record:\n', error);
            console.log('rec1 Record saved:', rec);
        });
    },
    async record2() {

        const rec3 = new Record2({
            name: "c4",
            specials: ["a3", "b3"],
            ultimate: "C4"
        })
        await rec3.save(function (error, rec) {
            if (error)
                return console.log('error Record2:\n', error);
            console.log('rec1 Record2 saved:', rec);
        });

    },
    async subdocument() {
        const subdoc = new Subdocument({ name: 'Subdocument2' })

        // Adds specials
        subdoc.specials = [{
            name: 'A',
            keys: 'a'
        }, {
            name: 'B',
            keys: 'b'
        }, {
            name: 'c',
            keys: 'C'
        }]

        // Adds ultimate
        subdoc.ultimate = {
            name: 'abc',
            keys: 'ABC'
        }
        await subdoc.save(function (error, rec) {
            if (error)
                return console.log('error subdoc:\n', error);
            console.log('rec1 subdoc saved:', rec);
        });
    },
    async blogPost() {

        const post = new BlogPost({
            title: 'Sport',
            content: `The world cups are, depending on the sport`
        });
        await post.save(function (error, rec) {
            if (error)
                return console.log('error post:\n', error);
            console.log(' post saved:\n', rec);
        });

    },
    async comment() {

        const comment = new Comment({
            comments: `A12445TBreaking World Cup 2022 news and in-depth analysis from the best newsroom in sports.`
        });
        const savedComment = await comment.save();

        const blogPost = await BlogPost.findOne({ title: 'Weather' })
        blogPost.comments.push(savedComment._id)
        const savedPost = await blogPost.save()
        console.log('savedPost:\n',savedComment._id)

    },
}