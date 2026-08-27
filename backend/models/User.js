import mongo from "mongoose";

const userSchema = new mongo.Schema({
    name:{
        type:String,
        required:true,        
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        trialPeriod:{
            type:Number,
            default:3
        },
        trialActive:{
            type:Boolean,
            default:true
        },
        trialExpires:{
            type:Date
        },
        subscriptionPlan:{
            type:String,
            enum:["Trial","Free","Premium"],
            default:"Trial"
        },
        apiRequestCount:{
            type:Number,
            default:0
        },
        monthlyRequestCount:{
            type:Number,
            default:100
        },
        nextBillingDate:Date,
        payments:[
            {
                type:mongo.Schema.Types.ObjectId,
                ref:'Payment'
            }
        ],
        contentHistory:[
            {
                type:mongo.Schema.Types.ObjectId,
                ref:'ContentHistory'
            }
        ]
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
const User = mongo.model("User", userSchema);
export default User;