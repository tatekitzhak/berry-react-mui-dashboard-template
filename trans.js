const mongooseConnect = require('./db/conn');
// const Record = require('./model/schemas/record');
const { record, subdocument } = require('./model/index');

async function transcript() {

  const rec1 = await Record.findOne({ name: 'a1' });
  rec1.specials = [
    'Hadoken',
    'Shoryuken',
    'Tatsumaki Senpukyaku111'
  ];

  await rec1.save(function (error, rec) {
    if (error) 
    return console.log('error Record:\n', error);
    console.log('rec1 Record saved:', rec);
  });

  /* const ryu = new Character ({
    name: 'Ryu 1',
    ultimate: 'Shinku Hadoken'
  });

  await ryu.save(); */
  /*   
    const ryu = await Character.findOne({ name: 'Ryu' });
  
    ryu.specials = [
      'Hadoken',
      'Shoryuken',
      'Tatsumaki Senpukyaku'
    ];
    const doc = await ryu.save(function (error, document) {
      if (error) 
      return console.log('error Character:\n', error);
      console.log('document:\n', document);
      return document;
    })
  
    console.log('doc:',doc)
   */
  // const blogPost = await BlogPost.findOne({ title: 'Weather' })
  //   .populate('comments')
  // console.log(blogPost)


  // a document instance
  /* 
  for(let i = 1; i <= 10; i++){
    var post1 = new BlogPost({
      title: `Any post ${i}`,
      content: `Any content ${i}`,
    });
  
    // save model to database
    await post1.save(function (err, post) {
      if (err) 
        return console.log('err\n', err);
      console.log(post.title + " saved to bookstore collection.");
    });
  } 
  */
  /* 
   for(let i = 1; i <= 10; i++){
    let doc = '', comment = ''; 
    try {
      doc = await BlogPost.create({
        title: `Any post ${i+1}`,
        content: `Any content ${i*2}`,
      });
  
      try {
        comment = await Comment.create({
          comment: `Comment ${i +1}`,
          name: doc._id
        })
      
      } catch (error) {
        console.log('error 2: \n')
      }
      
    } catch (error) {
      console.log('error 1: \n', error)
    }
   
    console.log(" \n." + comment);
  } 
   */
}

mongooseConnect('transcript');

subdocument()
  .catch(error => {
    console.log('error transcript: \n', error)
  });
