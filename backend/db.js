const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectdb = async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/gofooddatabase",
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
      if (err) console.log(err);
      else {console.log("Database connected");  
      const fetched_data = await mongoose.connection.db.collection("fooddata")
      fetched_data.find({}).toArray(async (err,data)=>{
        const foodcategory = await mongoose.connection.db.collection("foodcategory");
        foodcategory.find({}).toArray((err, categorydata)=>{
          global.food_data = data;
          global.category_data = categorydata
          // console.log(global.food_data)
        })
        // 
        
      })
    }
    }
  );
};
module.exports = connectdb;
