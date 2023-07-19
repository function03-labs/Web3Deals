import connectDatabase from '../../db';
import { Fundraising } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await connectDatabase();

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      const firstDayOfNextWeek = new Date(firstDayOfWeek);
      firstDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + 7);
      
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      
      const totalFundAmountThisMonth = await Fundraising.aggregate([
        { $match: { funddate: { $gte: firstDayOfMonth.getTime() / 1000, $lt: firstDayOfNextMonth.getTime() / 1000 } } },
        { $group: { _id: null, total: { $sum: "$fundamount" } } }
      ]);

      const totalFundAmountAllTime = await Fundraising.aggregate([
        { $group: { _id: null, total: { $sum: "$fundamount" } } }
      ]);

      const totalFundAmountThisWeek = await Fundraising.aggregate([
        { $match: { funddate: { $gte: firstDayOfWeek.getTime() / 1000, $lt: firstDayOfNextWeek.getTime() / 1000 } } },
        { $group: { _id: null, total: { $sum: "$fundamount" } } }
      ]);

      const fundsToday = await Fundraising.countDocuments({ funddate: { $gte: today.getTime() / 1000, $lt: tomorrow.getTime() / 1000 } });
      const fundsThisWeek = await Fundraising.countDocuments({ funddate: { $gte: firstDayOfWeek.getTime() / 1000, $lt: firstDayOfNextWeek.getTime() / 1000 } });
      const fundsThisMonth = await Fundraising.countDocuments({ funddate: { $gte: firstDayOfMonth.getTime() / 1000, $lt: firstDayOfNextMonth.getTime() / 1000 } });

      const topProjectsToday = await Fundraising.aggregate([
        { $match: { funddate: { $gte: today.getTime() / 1000, $lt: tomorrow.getTime() / 1000 } } },
        { $group: { _id: "$projectname", total: { $sum: "$fundamount" } } },
        { $sort: { total: -1 } },
        { $limit: 3 }
      ]);
  // Top 3 projects this week
  const topProjectsThisWeek = await Fundraising.aggregate([
    { $match: { funddate: { $gte: firstDayOfWeek.getTime() / 1000, $lt: firstDayOfNextWeek.getTime() / 1000 } } },
    { $group: { _id: "$projectname", total: { $sum: "$fundamount" }, logo: { $first: "$logo" } } },
    { $sort: { total: -1 } },
    { $limit: 3 }
  ]);

  // Top 3 projects this month
  const topProjectsThisMonth = await Fundraising.aggregate([
    { $match: { funddate: { $gte: firstDayOfMonth.getTime() / 1000, $lt: firstDayOfNextMonth.getTime() / 1000 } } },
    { $group: { _id: "$projectname", total: { $sum: "$fundamount" }, logo: { $first: "$logo" } } },
    { $sort: { total: -1 } },
    { $limit: 3 }
  ]);

  // Top 3 projects all time
  const topProjectsAllTime = await Fundraising.aggregate([
    { $group: { _id: "$projectname", total: { $sum: "$fundamount" }, logo: { $first: "$logo" } } },
    { $sort: { total: -1 } },
    { $limit: 3 }
  ]);

      const mostFrequentInvestorsAllTime = await Fundraising.aggregate([
        { $unwind: "$investorlist" },
        { $group: { _id: "$investorlist.investorname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);

      const mostFrequentInvestorsThisMonth = await Fundraising.aggregate([
        { $match: { funddate: { $gte: firstDayOfMonth.getTime() / 1000, $lt: firstDayOfNextMonth.getTime() / 1000 } } },
        { $unwind: "$investorlist" },
        { $group: { _id: "$investorlist.investorname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);

      const mostFrequentInvestorsThisWeek = await Fundraising.aggregate([
        { $match: { funddate: { $gte: firstDayOfWeek.getTime() / 1000, $lt: firstDayOfNextWeek.getTime() / 1000 } } },
        { $unwind: "$investorlist" },
        { $group: { _id: "$investorlist.investorname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);

      const data = {
        totalFundAmountThisMonth: totalFundAmountThisMonth[0]?.total || 0,
        totalFundAmountAllTime: totalFundAmountAllTime[0]?.total || 0,
        totalFundAmountThisWeek: totalFundAmountThisWeek[0]?.total || 0,
        fundsToday: fundsToday,
        fundsThisWeek: fundsThisWeek,
        fundsThisMonth: fundsThisMonth,
        topProjectsToday: topProjectsToday,
        topProjectsThisWeek,
        topProjectsThisMonth,
        topProjectsAllTime,
        mostFrequentInvestorsAllTime: mostFrequentInvestorsAllTime[0]?._id || 'No data',
        mostFrequentInvestorsThisMonth: mostFrequentInvestorsThisMonth[0]?._id || 'No data',
        mostFrequentInvestorsThisWeek: mostFrequentInvestorsThisWeek[0]?._id || 'No data'
      };

      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
