const mongoose = require("mongoose")


function connectToDatabase(url) {
   mongoose.connect(url).then(()=>{
    console.log("Connected To Database")
   }).catch((err)=>{
    console.log(`Error Connecting To Database ${err}`)
   })
}
module.exports = connectToDatabase