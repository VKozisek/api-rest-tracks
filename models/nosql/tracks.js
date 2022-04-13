const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt
    versionKey: false,
  }
);
/**
 * Implementar metodo propio con relacion a storage
 */
TracksScheme.statics.findAllData = function (name) {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      },
    },
  ]);
  return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("tracks", TracksScheme);
