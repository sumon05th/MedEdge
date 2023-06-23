import { connectToDatabase } from '../../db';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('files');

    // Assuming you have a 'files' collection in your database

    const file = req.file;
    const { originalname, mimetype, size } = file;

    const result = await collection.insertOne({
      filename: originalname,
      mimetype,
      size,
    });

    res.status(200).json({ success: true, fileId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
