const mongoose = require('mongoose');
const User = require('./User');

const notificationSchema = new mongoose.Schema({
    notification_id:{
        type: mongoose.Types.ObjectId
    },
    notification_type:{
        type: String,
        trim: true,
        required: true,
        // validate(value) {
        //     if (!value.toLowerCase().includes('quick') || !value.toLowerCase().includes('scheduled')) {
        //         throw new Error('Invalid notification type')
        //     }
        // }
        enum: ['quick', 'scheduled']
    },
    scheduled_time:{
        type: Date,
        required: true
    },
    notification_to:{
        type: Array,
        trim: true,
        required: true
    },
    payload: {
        type: String,
        required: true
    }
}, {timestamps: true});

Notification.statics.CreateNotification = async notificationObj => {
    if(notificationObj.)
};

module.exports = Notification = mongoose.model('Notification', notificationSchema);