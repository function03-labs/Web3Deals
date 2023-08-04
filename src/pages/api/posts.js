// Importing the required libraries
import connectDatabase, { FundraisingInfo } from '../../db'

export default async function handler(req, res) {
  // Ensure we connect to the database
  await connectDatabase();

  try {
    // Query the database for a FundraisingInfo document with the matching 'fundraising_name'
    const fund = await FundraisingInfo.find().sort({ _id: -1 }).limit(10);

    if (!fund || fund.length === 0) {
      // If no fund was found, return an error
      return res.status(404).json({ error: `No funds found!` });
    }

    // If a fund was found, return it
    return res.status(200).json(fund);
  } catch (error) {
    // If there was an error querying the database, return an error
    return res.status(500).json({ error: `Database error: ${error.message}` });
  }
}
