/*jiwon code*/
import { connectDB } from "@/util/database"

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    console.log('jiwon log #########################testing###############################')
    console.log('jiwon log #########################testing###############################')
    console.log('Received query:', req.query);
  
    const query = req.query.myQuery;
    console.log('#########################jiwon log / testing###############################')
    console.log('#########################jiwon log / testing###############################')
    console.log('Query : ', query)
  
    try {
      const courses = (await connectDB).db("AAAA")
      let result = await courses.collection("GroupList").find({
        $or: [
          {course: { $regex: query, $options: 'i' }},
          {professor: {$regex: query, $options: 'i'}},
        ]
      }).toArray();
      // console.log('#########################jiwon log / testing###############################')
      // console.log('#########################jiwon log / testing###############################')
      // console.log(result)
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching from database');
    }
  }