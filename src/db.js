import mongoose from 'mongoose';

// MongoDB connection URI
const database_url= process.env.MONGODB_STRING;

// A flag to track if the database is already connected
let isConnected = false;

// Function to connect to the MongoDB database
async function connectDatabase() {
  if (isConnected) {
    return;
  }

  try {
    // Connect to the MongoDB using the provided URI
    await mongoose.connect(database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Export the connectDatabase function to be used in other parts of the application
export default connectDatabase;

// Define the Mongoose schema for the "Fundraising" collection
const projectSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  fundcode: String,
  categorylist: [
    {
      code: String,
      name: String,
    },
  ],
  coincode: String,
  coinsymbol: String,
  fundamount: Number,
  funddate: Number,
  fundstagecode: String,
  fundstagename: String,
  investorcodes: String,
  investorcount: Number,
  investorlist: [
    {
      investorlogo: String,
      investorcode: String,
      investorname: String,
    },
  ],
  investorlogos: String,
  investornames: String,
  logo: String,
  projectcode: String,
  projectname: String,
  valulation: Number,
});

const fundraisingInfoSchema = new mongoose.Schema({
  logo_img_src: String,
  fundraising_name: String,
  funds_info: String,
  projects_info: String,
  website_links: [String],
});

// Declare the "Fundraising" model using the schema
let Fundraising;
try {
  Fundraising = mongoose.model('Fundraising');
} catch (error) {
  // If the model already exists, use the existing model; otherwise, create a new one
  Fundraising = mongoose.model('Fundraising', projectSchema, 'fundraising');
}

let FundraisingInfo;
try {
  FundraisingInfo = mongoose.model('FundraisingInfo');
} catch (error) {
  // If the model doesn't exist, create a new one
  FundraisingInfo = mongoose.model('FundraisingInfo', fundraisingInfoSchema, 'fundraising_info');
}

// Export the "Fundraising" model to be used in other parts of the application
export { Fundraising,FundraisingInfo };