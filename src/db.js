import mongoose from 'mongoose';

const uri = 'mongodb+srv://admin:web3deals@cluster-web3deals.sx22edf.mongodb.net/data?retryWrites=true&w=majority';

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

export default connectDatabase;
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
  
  let Fundraising;
  try {
    Fundraising = mongoose.model('Fundraising');
  } catch (error) {
    Fundraising = mongoose.model('Fundraising', projectSchema, 'fundraising');
  }
export {Fundraising};