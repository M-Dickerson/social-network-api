const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
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
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// export
module.exports = reactionSchema;