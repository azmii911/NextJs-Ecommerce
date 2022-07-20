import nc from 'next-connect'
import Category from '../../../models/CategoriesModel';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req,res) => {
    await db.connect();
    const Categories = await Category.find({});
    await db.disconnect();
    res.send(Categories);
})
export default handler; 