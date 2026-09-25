import {Router} from 'express';import {protect} from '../middleware/auth.js';import Product from '../models/Product.js';
const r=Router();r.post('/validate',protect,async(req,res)=>{const ids=(req.body.items||[]).map(x=>x.productId);const products=await Product.find({_id:{$in:ids}});res.json(products);});export default r;
