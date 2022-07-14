const mongoose = require('mongoose');
const URI = "mongodb+srv://anshuman:anshumannehru@cluster0.lnxn6.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => { 
   try {
       await mongoose.connect(URI);
       console.log('mongodb connected')
   } catch (error) {
       console.log(error);
   }
}

module.exports= connectDB