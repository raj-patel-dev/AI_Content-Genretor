import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleFreeSubscriptonAPI } from "../../apis/stripePayment/StripePayment";
import StatusMessage from "../Alert/StatusMessage";
import { Card, Heading, Text, Button, Tag, Flex } from "../once-ui";
import { CheckIcon } from "@heroicons/react/20/solid";

const FreePlanSignup = () => {
    const planDetails = {
        name: "Free",
        price: "$0.00/month",
        features: ["5 Credits", "1 User", "Basic Support", "Max 2-Word AI Generation"]
    };

    const mutation = useMutation({ mutationFn: handleFreeSubscriptonAPI });

    const handleConfirmClick = () => {
        mutation.mutate();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <Card variant="glow" padding="lg" className="max-w-md w-full z-10">
                <Flex direction="column" gap="6">
                    <div className="text-center space-y-2">
                        <Tag variant="success" size="m">Free Subscription</Tag>
                        <Heading level={2} size="l">
                            Confirm Your Free Plan
                        </Heading>
                        <Text variant="tertiary" size="sm">
                            Enjoy our free plan with zero costs involved.
                        </Text>
                    </div>

                    {mutation?.isError && (
                        <StatusMessage
                            type="error"
                            message={mutation?.error?.response?.data?.error || "Error activating free plan"}
                        />
                    )}

                    {mutation?.isPending && (
                        <StatusMessage type="loading" message="Activating Free plan..." />
                    )}

                    {mutation?.isSuccess && (
                        <StatusMessage type="success" message="Free plan activated successfully!" />
                    )}

                    <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-3">
                        <Text variant="secondary" size="xs" weight="semibold" className="uppercase tracking-wider">
                            Plan Details
                        </Text>
                        <ul className="space-y-2">
                            {planDetails.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                    <CheckIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center font-bold text-emerald-400 text-lg">
                        {planDetails.price} - No Credit Card Required
                    </div>

                    <Button
                        onClick={handleConfirmClick}
                        variant="gradient"
                        size="l"
                        className="w-full"
                        loading={mutation?.isPending}
                    >
                        Activate Free Plan : $0.00/month
                    </Button>
                </Flex>
            </Card>
        </div>
    );
};

export default FreePlanSignup;