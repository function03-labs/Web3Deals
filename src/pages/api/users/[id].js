import { getServerSession } from "next-auth/next"
import prisma from '../../../lib/prismadb'
import { authOptions } from "../auth/[...nextauth]"


// Define the API route handler
export default async function handle(req, res) {
    // Ensure this is a PATCH method request
    if (req.method !== 'PATCH') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    // Get the session from the request

    const session = await getServerSession(req,res,authOptions);
    if (!session?.user || req.query.id !== session?.user.id) {
        return res.status(401).json({ message: 'Not Authorized' });
      }

  
    // Parse the request body
    const { name } = req.body;
  
    // Update the user record in the database
    try {
      const user = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          name: name,
        },
      });
  
      // If successful, return the updated user
      return res.status(200).json(user);
    } catch (error) {
      // If unsuccessful, return an error message
      return res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  }