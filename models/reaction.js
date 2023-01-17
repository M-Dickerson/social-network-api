const { Schema, model } = require("mongoose");
const moment = require("moment");
// creates the reaction schema
const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectID(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// export
module.exports = reactionSchema;