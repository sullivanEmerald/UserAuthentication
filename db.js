const Mongoose =  require('mongoose')
const RemoteDB = 'mongodb+srv://brownBlog:brown33513140@cluster0.izru7.mongodb.net/UserAuth?retryWrites=true&w=majority'

const ConnectDB  = async () => {
    Mongoose.connect(RemoteDB)
        .then(client => {
            console.log('MongoDB connected successful')
        })
}
module.exports  = ConnectDB