const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        default: false,
        required: true
    }
})


const User = mongoose.model('user', userSchema)
var user = new User({ id: 1, password: '12345', role: 'client', username: 'satyajeet.khanna@gmail.com' })
user.save().then(() => {
    res.status(201).send()
})

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Unable to login');
    }

    //const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

module.exports = User