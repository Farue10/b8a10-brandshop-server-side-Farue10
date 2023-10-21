const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// omarfaruqe758
// vpAsSmFF3GhCnR4t

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://omarfaruqe758:vpAsSmFF3GhCnR4t@cluster0.2txnone.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect()node

    const userCollection = client.db("userDB").collection("user");
    const deatilsCollection = client.db("deatilsDB").collection("deatils");
    const personCollection = client.db("personDB").collection("person");



    // ----------------Usercollection Code start here------------------------

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/userSingle/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id)
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      // console.log(result)
      res.send(result);
    });

    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });


    
    app.get("/user/:brand", async (req, res) => {
        const name = req.params.brand;
        const query = { brand: name };
        const cursor = userCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      });


      
    app.put("/updateed/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        // Set the upsert option to insert a document if no documents match the filter
        const options = { upsert: true };
        const updateBrand = req.body;
        const brand = {
          // Specify the update to set a value for the input field
          $set: {
            name: updateBrand.name,
            type: updateBrand.type,
            brand: updateBrand.brand,
            rating: updateBrand.rating,
            price: updateBrand.price,
            shortDescription: updateBrand.short,
            image: updateBrand.image,
          },
        };
        const result = await userCollection.updateOne(filter, brand, options);
        res.send(result);
      });



    //-------DeailsCollection start haere---------------------

    app.post("/deatils", async (req, res) => {
        const cardInfo = req.body;
        console.log(cardInfo);
        const result = await deatilsCollection.insertOne(cardInfo);
        res.send(result);
      });

      
    app.get("/deatils", async (req, res) => {
        const {user} = req.query
        console.log(user);
        const query = {email: user}
        const cursor = deatilsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      });

    app.delete("/deatils/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await deatilsCollection.deleteOne(query);
      res.send(result);
    });

        // -------personCollection start here-------------------------
        app.post('/person',async(req,res)=>{
            const user=req.body
            console.log('this is',user);
            const result = personCollection.insertOne(user)
            res.send(result)
        })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hellooooooooo twoha");
});

app.listen(port, () => {
  console.log(`this port is ${port}`);
});
