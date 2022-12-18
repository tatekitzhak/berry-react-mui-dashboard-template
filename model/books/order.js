/**
 * https://stackoverflow.com/questions/53880700/how-to-create-mongodb-schema-design-while-dealing-with-single-user-account-and-m

 * https://www.mauaznar.com/posts/snippets/mongoose/
 */

const orderSchema = new Schema({
    referenceId: {
        type: String
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'closed'],
        default: 'open'
    },
    status:{
        type:String,
        enum:["Ordered","Processing","On the way","Completed"],
        default:"Ordered"
    },
    items: { type: Schema.Types.ObjectId, ref: 'Product' },
     events: [{ type: Schema.Types.ObjectId, ref: 'OrderEvent' }],
    seen: [{
        by: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        at: {
            type: Number,
        },
        _id: false
    }],
    comments: [{
        message: {
            type: String
        },
        commentedBy: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        commentedAt: {
            type: Number,
        },
        images: [imagesSchema]
    }, {
        strict: false,
        versionKey: false
    }],
    images: [imagesSchema]
}, {
    strict: false,
    versionKey: false
}, {
    timestamps: true
});


var User = new Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: false,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        set: encrypt
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'root']
    }
}, {
    strict: true
}, {
    timestamps: true
});
