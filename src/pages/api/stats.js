import connectDatabase from '../../db';
import { Fundraising } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await connectDatabase();

    try {  const { timeframe } = req.query;
  
    let startDate;
    // Determine the start date based on the timeframe
    if (timeframe === 'month') {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (timeframe === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeframe === 'year') {
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      return res.status(400).send('Invalid timeframe');
    }
  
    const totalFundAmount = await Fundraising.aggregate([
      { $match: { funddate: { $gte: startDate.getTime()/ 1000 }}},
      { $group: { _id: null, total: { $sum: "$fundamount" }}}
    ]);

    const funds = await Fundraising.countDocuments({ funddate: { $gte: startDate.getTime() / 1000} });
  
    const topCategories = await Fundraising.aggregate([
      { $match: { funddate: { $gte: startDate.getTime()/ 1000 }}},
      { $unwind: "$categorylist" },
      { $group: { _id: "$categorylist.name", sum: { $sum: "$fundamount" }}},
      { $sort: { sum: -1 }},
      { $limit: 3 }
    ]);
  
    const topProjects = await Fundraising.aggregate([
      { $match: { funddate: { $gte: startDate.getTime()/ 1000 }}},
      { $group: { _id: "$projectname", sum: { $sum: "$fundamount" }, logo: { $first: "$logo" }}},
      { $sort: { sum: -1 }},
      { $limit: 3 }
    ]);
  
    const topInvestors = await Fundraising.aggregate([
      { $match: { funddate: { $gte: startDate.getTime()/ 1000 }}},
      { $unwind: "$investorlist" },
      { $group: { _id: "$investorlist.investorname", sum: { $sum: "$fundamount" }, logo: { $first: "$investorlist.investorlogo" }}},
      { $sort: { sum: -1 }},
      { $limit: 3 }
    ]);

    const data={ 
      totalFundAmount: totalFundAmount[0]?.total || 0,
      topCategories,
      topProjects,
      topInvestors,
      funds}

      res.status(200).json(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
