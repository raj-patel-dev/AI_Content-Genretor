import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createStripePaymentAPI } from "../../apis/stripePayment/StripePayment";
import StatusMessage from "../Alert/StatusMessage";
import { Card, Heading, Text, Button, Tag, Banner, Flex } from "../once-ui";
import { FaLock, FaExclamationTriangle } from "react-icons/fa";

const CheckoutForm = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const plan = params.plan;
    const amount = searchParams.get("amount");

    // Enforce restriction for Basic and Premium tiers
    const isPaymentDisabled = plan === "Basic" || plan === "Premium" || !plan;

    const mutation = useMutation({
        mutationFn: createStripePaymentAPI,
    });

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isPaymentDisabled) {
            setErrorMessage("Payment page for Basic and Premium tiers has been disabled.");
            return;
        }

        if (!elements || !stripe) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        try {
            const data = { amount, plan };
            const resData = await mutation.mutateAsync(data);

            if (resData?.clientSecret) {
                const { error } = await stripe.confirmPayment({
                    elements,
                    clientSecret: resData.clientSecret,
                    confirmParams: {
                        return_url: `${window.location.origin}/success`,
                    },
                });
                if (error) {
                    setErrorMessage(error?.message);
                }
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.error || error?.message || "Payment failed");
        }
    };

    if (isPaymentDisabled) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

                <Card variant="glass" padding="lg" className="max-w-md w-full text-center space-y-6 z-10">
                    <Flex justify="center" align="center" className="w-16 h-16 bg-amber-500/10 rounded-full mx-auto text-amber-400 text-2xl border border-amber-500/20">
                        <FaExclamationTriangle />
                    </Flex>

                    <Heading level={2} size="m">Payment Page Disabled</Heading>

                    <Text variant="secondary" size="sm">
                        Payment pages for <span className="font-semibold text-white">{plan || "Basic & Premium"}</span> subscription levels have been removed/disabled. These tiers do not have a payment interface.
                    </Text>

                    <Tag variant="warning" size="m">No Payment Required</Tag>

                    <Button variant="gradient" size="m" className="w-full" onClick={() => navigate("/plans")}>
                        Return to Subscription Plans
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <Card variant="glow" padding="lg" className="max-w-md w-full z-10">
                <Flex direction="column" gap="6">
                    <Flex align="center" justify="between">
                        <Heading level={2} size="m">Checkout Plan: {plan}</Heading>
                        <Tag variant="brand" size="s">USD ${amount}</Tag>
                    </Flex>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="p-4 bg-slate-950 rounded-xl border border-white/10">
                            <PaymentElement />
                        </div>

                        {mutation?.isPending && (
                            <StatusMessage type="loading" message="Processing checkout..." />
                        )}

                        {mutation?.isError && (
                            <StatusMessage
                                type="error"
                                message={mutation?.error?.response?.data?.error || "Error initiating checkout"}
                            />
                        )}

                        <Button
                            type="submit"
                            variant="gradient"
                            size="l"
                            className="w-full"
                            loading={mutation?.isPending}
                            prefixIcon={<FaLock className="mr-1" />}
                        >
                            Pay ${amount}
                        </Button>

                        {errorMessage && (
                            <Banner type="error" message={errorMessage} />
                        )}
                    </form>
                </Flex>
            </Card>
        </div>
    );
};

export default CheckoutForm;