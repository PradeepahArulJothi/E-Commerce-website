import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},name:String,price:Number,quantity:Number}], shipping:{name:String,address:String,city:String,pincode:String,phone:String}, total:Number, paymentMethod:{type:String,default:'Dummy Payment'}, status:{type:String,default:'Placed'} },{timestamps:true});
export default mongoose.model('Order',schema);
