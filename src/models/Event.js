const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    address: String,
    seats: Number,
    price: Number,
    thumbnail: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    toJSON: {
        virtuals: true
    } 
});

EventSchema.virtual('thumbnail_url').get(function () { return this.thumbnail })

module.exports = mongoose.model('Event', EventSchema)