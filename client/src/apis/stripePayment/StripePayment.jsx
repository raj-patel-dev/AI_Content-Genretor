import axios from 'axios'

export const handleFreeSubscriptonAPI = async() => {
    try {
        const response = await axios.post("https://ai-content-genretor.onrender.com/api/v1/stripe/free-plan",
            {},
            {
                withCredentials:true
            }
        );
        return response?.data;
    } catch(error) {
        console.error("Error handling free subscription: ",error);
    }

}

export const createStripePaymentAPI = async (payment) => {
    console.log("Payment data in API : ",payment)
    try {
        const response = await axios.post("https://ai-content-genretor.onrender.com/api/v1/stripe/checkout",
            {
                amount:Number(payment?.amount),
                subscriptionPlan:payment?.plan
            },
            {
                withCrentials:true,
            }

        );
        return response?.data;
    } catch(error) {
        console.error("Error handling stripe payment: ",error);
    }
}

export const verifyPaymentAPI = async (paymentId) => {
    try {
        const response = await axios.post(`https://ai-content-genretor.onrender.com/api/v1/stripe/verify-payment/${paymentId}`);

        return response?.data;
    } catch(error) {
        console.error("Error verifying payment :",error);
    }
}
