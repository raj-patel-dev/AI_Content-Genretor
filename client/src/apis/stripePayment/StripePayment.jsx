import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const handleFreeSubscriptonAPI = async () => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/stripe/free-plan`,
            {},
            {
                withCredentials: true,
            }
        );
        return response?.data;
    } catch (error) {
        console.error("Error handling free subscription: ", error);
        throw error;
    }
};

export const createStripePaymentAPI = async (payment) => {
    console.log("Payment data in API : ", payment);
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/stripe/checkout`,
            {
                amount: Number(payment?.amount),
                subscriptionPlan: payment?.plan,
            },
            {
                withCredentials: true,
            }
        );
        return response?.data;
    } catch (error) {
        console.error("Error handling stripe payment: ", error);
        throw error;
    }
};

export const verifyPaymentAPI = async (paymentId) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/stripe/verify-payment/${paymentId}`,
            {},
            {
                withCredentials: true,
            }
        );

        return response?.data;
    } catch (error) {
        console.error("Error verifying payment :", error);
        throw error;
    }
};
