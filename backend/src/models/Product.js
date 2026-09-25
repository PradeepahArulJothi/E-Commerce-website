import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name:{type:String,required:true}, category:{type:String,required:true}, price:{type:Number,required:true}, description:String, image:String, stock:{type:Number,default:20}, featured:{type:Boolean,default:false} },{timestamps:true});
export default mongoose.model('Product',schema);
