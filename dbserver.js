const { response } = require("express");
const express = require("express");
const Joi = require("joi");
const app = express();
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({dest:__dirname + "/public/images"});

mongoose.connect("mongodb+srv://cmelmore:sxLn585PhQg9P13u@cluster0.av3lgun.mongodb.net/")
.then(() => console.log("connected to mongodb"))
.catch((err)=> console.err("could not connect", err));

const foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    sets: String,
    reps: String,
    img: String,
})

const Food = mongoose.model("Food", foodSchema);

app.get("/api/foods", (req, res) => {
    //res.send(foods);
    getFoods(res);
});

const getFoods = async(res)=>{
    const foods = await Food.find();
    res.send(foods);
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html", __dirname + "/Legs.html");
});




app.post("/api/foods", upload.single("img"), (req, res) => {
    console.log(req.body);
    const result = validateFood(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const food = new Food ({
        name: req.body.name,
        description: req.body.description,
        sets: req.body.sets,
        reps: req.body.reps,
        
    });

    if(req.file){
        food.img = "images/" + req.file.filename;
    }

    createFood(food, res);
});

const createFood = async(food, res) => {
    const result = await food.save();
    res.send(food);
}

app.put("/api/foods/:id", upload.single("img"), (req, res) => {
    const id = parseInt(req.params.id);

    const food = foods.find((r) => r.id === id);;

    const result = validateFood(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

   updateFood(req, res);
});

const updateFood = async (req, res) => {
    let fieldsToUpdate = {
      name: req.body.name,
      description: req.body.description,
      reps: req.body.reps,
    sets: reg.body.sets
    };
  
    if (req.file) {
      fieldsToUpdate.img = "images/" + req.file.filename;
    }
  
    const result = await Food.updateOne({ id: req.params.id }, fieldsToUpdate);
    const food = await Food.findById(req.params.id);
    res.send(food);
  };

  app.delete("/api/foods/:id", upload.single("img"), (req, res) => {
    removeFood(res, req.params.id);
  });
  
  const removeFood = async (res, id) => {
    const food = await Food.findByIdAndDelete(id);
    res.send(food);
  };

const validateFood = (food) => {
    const schema = Joi.object({
        id : Joi.allow(" "),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        sets: Joi.string().min(1).required(),
        reps: Joi.string().min(1).required(),

    });

    return schema.validate(food);
};

app.listen(4000, () =>{
    console.log("Im listening");
}); 