import connectDatabase from '../../db';
import { Fundraising } from '../../db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
      await connectDatabase();
  
      const page = parseInt(req.query.page, 10) || 1;
      const documentsPerPage = 40;
      const skip = (page - 1) * documentsPerPage;
  
      const fundstagename = req.query.fundstagename || "";
      const category = req.query.category || "";
      const fundRange = req.query.fundRange || "";
      const year = req.query.year;
      const projectname = req.query.projectname || "";
      const sortField = req.query.sortField || "funddate";
      const sortOrder = req.query.sortOrder === "desc" ? 1 : -1;

      const mapping = {
        'range-a': [0, 1000000],
        'range-b': [1000000, 5000000],
        'range-c': [5000000, 10000000],
        'range-d': [10000000, 50000000],
        'range-e': [50000000, 100000000],
        'range-f': [100000000, Number.MAX_SAFE_INTEGER],
      };

      const [minFundamount, maxFundamount] = mapping[fundRange] || [0, Number.MAX_SAFE_INTEGER];
  
      const query = {
        fundamount: { $gte: minFundamount, $lte: maxFundamount },
      };
      
      if (fundstagename) query.fundstagename = fundstagename;
      if (category) query.categorylist = { $elemMatch: { code: category }};
      if (projectname) query.projectname = { $regex: projectname, $options: 'i' };
  
      if (year) {
        const startOfYear = new Date(year, 0, 1).getTime() / 1000;  // beginning of the year
        const endOfYear = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;  // end of the year
        console.log(startOfYear,endOfYear);
        query.funddate = { $gte: startOfYear, $lt: endOfYear };
      }
  
      const sort = { [sortField]: sortOrder };
  
      try {
        const data = await Fundraising.find(query)
          .skip(skip)
          .limit(documentsPerPage)
          .sort(sort)
          .exec();
        res.status(200).json(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  