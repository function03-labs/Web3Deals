import connectDatabase, { Fundraising } from '../../db';

function getWeekRange(year, week) {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return [startOfWeek.getTime() / 1000, endOfWeek.getTime() / 1000];
}

function getPastDaysTimestamp(days) {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - days);
  return pastDate.getTime() / 1000;
}



// The function handles incoming HTTP requests
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    // Connect to the database
    await connectDatabase();

    // Extract query parameters from the request
    const {
      fundstagename = '',
      category = '',
      fundRange = '',
      year,
      month,
      week,
      projectname = '',
    } = req.query;

    const page = parseInt(req.query.start, 10) || 1;

    // Set default sorting field and order if not provided in the query
    const sortField = req.query.sortField || 'funddate';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Set the number of documents to display per page
    const documentsPerPage = 15;

    // Calculate the number of documents to skip based on the current page
    const skip = (parseInt(page, 10) - 1) * documentsPerPage;

    // Define a mapping for different funding ranges
    const mapping = {
      'range-a': [0, 1000000],
      'range-b': [1000000, 5000000],
      'range-c': [5000000, 10000000],
      'range-d': [10000000, 50000000],
      'range-e': [50000000, 100000000],
      'range-f': [100000000, Number.MAX_SAFE_INTEGER],
    };

    // Retrieve the minimum and maximum funding amounts based on the specified range
    const [minFundamount, maxFundamount] = mapping[fundRange] || [0, Number.MAX_SAFE_INTEGER];

    // Construct the query object to filter data from the database
    const query = {
      fundamount: { $gte: minFundamount, $lte: maxFundamount },
    };

    // Add additional filters to the query if the corresponding query parameters are provided
    if (fundstagename) {
      if (fundstagename.toLowerCase() === 'undisclosed') {
          query.fundstagecode = 'unknown';
      } else if (fundstagename.toLowerCase() === 'crowdfunding') {
          query.fundstagecode = 'equity-crowdfunding';
      } else {
          query.fundstagecode = fundstagename.toLowerCase();
      }
  }
    if (category) query.categorylist = { $elemMatch: { code: category } };
    if (projectname)
      query.projectname = { $regex: projectname, $options: 'i' }; // Perform a case-insensitive search
    if (year) {
      const startOfYear = new Date(year, 0, 1).getTime() / 1000; // beginning of the year
      const endOfYear = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000; // end of the year
      query.funddate = { $gte: startOfYear, $lt: endOfYear }; // Filter by the funddate field
    }

    if (month) {
      const pastmonthTimestamp = getPastDaysTimestamp(30);
      const currentTimestamp = Date.now() / 1000;
      query.funddate = { $gte: pastmonthTimestamp, $lt: currentTimestamp };
      /*const currentyear = new Date().getFullYear();
      const startOfMonth = new Date(currentyear, month, 1).getTime() / 1000;
      const endOfMonth = new Date(currentyear, month + 1, 0, 23, 59, 59).getTime() / 1000;
      query.funddate = { $gte: startOfMonth, $lt: endOfMonth };*/
    }

    if (week) {
      // Generate timestamp for the past 7 days
    const pastWeekTimestamp = getPastDaysTimestamp(7);
    const currentTimestamp = Date.now() / 1000;
    query.funddate = { $gte: pastWeekTimestamp, $lt: currentTimestamp };
    }

    // Specify the sorting order
    const sort = { [sortField]: sortOrder };

    try {
      // Fetch data from the database based on the constructed query
      const data = await Fundraising.find(query)
        .skip(skip)
        .limit(documentsPerPage)
        .sort(sort)
        .exec();

      // Get the total number of documents that match the query criteria
      const totalDocuments = await Fundraising.countDocuments(query).exec();

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalDocuments / documentsPerPage);

      // Respond with the fetched data and total number of pages as JSON
      res.status(200).json({ data, totalPages });
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
