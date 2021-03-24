const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema ({
    img:
        {
            type: String,
            required: true
        }
},{
    timestamps: true,
    versionKey: false
});

const Slider = mongoose.model('Slider',sliderSchema);

module.exports = Slider;