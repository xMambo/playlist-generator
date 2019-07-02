const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({
    bandName: { type: String, required: true },
   // imgUrl: { type: String, required: true }
});

const Band = mongoose.model("Band" ,bandSchema);


module.exports = Band;