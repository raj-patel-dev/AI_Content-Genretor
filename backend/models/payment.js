import mongo from "mongoose";

const paymentSchema = new mongo.Schema({
    user:{
        type:mongo.Schema.Types.ObjectId,
        ref:"User"
    },
    reference:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true   
    },
    status:{
        type:String,
        default:'pending',
        required:true
    },
    subscriptionPlan:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        default:0
    },
    monthlyRequestCount:{
        type:Number
    }
},
{
    timestamps:true
});

const Payment = mongo.model("Payment", paymentSchema);

export default Payment;