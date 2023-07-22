import connectDatabase from '../../db';
import { Fundraising } from '../../db';

// The function handles incoming HTTP requests
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Connect to the database
    await connectDatabase();

    try {
      // Extract the "timeframe" query parameter from the request
      const { timeframe } = req.query;

      // Calculate the start date based on the specified timeframe
      let startDate;
      switch (timeframe) {
        case 'month':
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'week':
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'year':
          startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        case 'all':
          startDate = null;
          break;
        default:
          return res.status(400).send('Invalid timeframe');
      }

      // Create a match condition based on the start date to filter data from the database
      const matchCondition = startDate ? { funddate: { $gte: startDate.getTime() / 1000 } } : {};

      // Calculate the total fund amount based on the match condition
      const totalFundAmount = await Fundraising.aggregate([
        { $match: matchCondition },
        { $group: { _id: null, total: { $sum: "$fundamount" } } }
      ]);

      // Count the number of funds based on the match condition
      const funds = await Fundraising.countDocuments(matchCondition);

      // Find the top three categories based on the total fund amount within the specified timeframe
      const topCategories = await Fundraising.aggregate([
        { $match: matchCondition },
        { $unwind: "$categorylist" },
        { $group: { _id: "$categorylist.name", sum: { $sum: "$fundamount" } } },
        { $sort: { sum: -1 } },
        { $limit: 3 }
      ]);

      // Find the top three projects based on the total fund amount within the specified timeframe
      const topProjects = await Fundraising.aggregate([
        { $match: matchCondition },
        { $group: { _id: "$projectname", sum: { $sum: "$fundamount" }, logo: { $first: "$logo" } } },
        { $sort: { sum: -1 } },
        { $limit: 3 }
      ]);

      // Find the top three investors based on the total fund amount within the specified timeframe
      const topInvestors = await Fundraising.aggregate([
        { $match: matchCondition },
        { $unwind: "$investorlist" },
        { $group: { _id: "$investorlist.investorname", sum: { $sum: "$fundamount" }, logo: { $first: "$investorlist.investorlogo" } } },
        { $sort: { sum: -1 } },
        { $limit: 3 }
      ]);

      // Construct the final data object to be sent as a JSON response
      const data = {
        totalFundAmount: totalFundAmount[0]?.total || 0, // Default to 0 if totalFundAmount is not available
        topCategories,
        topProjects,
        topInvestors,
        funds
      };

      // Respond with the aggregated data as JSON
      res.status(200).json(data);
    } catch (error) {
      // Handle errors if the database operation fails
      console.error('Failed to fetch data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    // Respond with a "Method Not Allowed" error for other HTTP request methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
