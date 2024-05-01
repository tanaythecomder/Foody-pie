const mongoose = require("mongoose");
const {MongoClient} = require("mongodb")
mongoose.set("strictQuery", true);


const url = "mongodb+srv://tanayfoodapp:tanayfoodapp@firstcluster.tf9mr3i.mongodb.net/foodypie?retryWrites=true&w=majority"
// const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

// const connectdb = async () => {
//   await mongoose.connect(
//     url,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     async (err) => {
//       if (err) console.log(err);
//       else {console.log("Database connected");  
//       const fetched_data = await mongoose.connection.db.collection("fooddata")
//       fetched_data.find({}).toArray(async (err,data)=>{
//         const foodcategory = await mongoose.connection.db.collection("foodcategory");
//         foodcategory.find({}).toArray((err, categorydata)=>{
//           global.food_data = data;
//           global.category_data = categorydata
//           // console.log(global.food_data)
//         })
//         // 
        
//       })
//     }
//     }
//   );
// };


const connectdb = async () => {
  try {
    // await 
    await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true } ).then(
      async ()=>{
        console.log("Succesfully Connected to database");
        const database = client.db("foodypie")
        const foodcategory = database.collection("foodcategory")
        const fooddata = database.collection("fooddata")

        const cursorData = await fooddata.find({})

        const data = await cursorData.toArray()

        const cursorCategorydata = await foodcategory.find({})

        const dataCategory = await cursorCategorydata.toArray()

        global.food_data = data
        global.category_data = dataCategory
        console.log(category_data)
      }
      
    )

  }
  catch(error) {
    console.log(error)
  }
};
module.exports = connectdb;
