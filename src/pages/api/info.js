// Importing the required libraries
import connectDatabase, { FundraisingInfo } from '../../db'

export default async function handler(req, res) {
  // Ensure we connect to the database
  await connectDatabase();

  // Extract the 'name' parameter from the query string
  const { name } = req.query;

  if (!name) {
    // If no 'name' was provided, return an error
    return res.status(400).json({ error: 'Missing "name" query parameter' });
  }

  try {
    // Query the database for a FundraisingInfo document with the matching 'fundraising_name'
    const fund = await FundraisingInfo.findOne({ fundraising_name: name });

    if (!fund) {
      // If no fund was found, return an error
      return res.status(404).json({ error: `No fund found with name "${name}"` });
    }

    // If a fund was found, return it
    return res.status(200).json(fund);
  } catch (error) {
    // If there was an error querying the database, return an error
    return res.status(500).json({ error: `Database error: ${error.message}` });
  }
}
