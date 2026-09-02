import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Card, Grid, Heading, Text, Button, Tag, Flex } from "../once-ui";

const tiers = [
  {
    name: "Free",
    id: "Free",
    price: "$0.00/month",
    amount: 0,
    description: "The essentials to provide your best work for clients.",
    features: ["5 Credits", "1 User", "Basic Support"],
    hasPayment: false,
    mostPopular: false,
  },
  {
    name: "Basic",
    id: "Basic",
    price: "$20/month",
    amount: 20,
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "50 Credits",
      "5 Users",
      "Priority Support",
      "Content generation history",
    ],
    hasPayment: false, // Payment interface disabled for Basic tier
    mostPopular: true,
  },
  {
    name: "Premium",
    id: "Premium",
    price: "$50/month",
    amount: 50,
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "100 Credits",
      "10 Users",
      "Priority Support",
      "Content generation history",
    ],
    hasPayment: false, // Payment interface disabled for Premium tier
    mostPopular: false,
  },
];

const Plans = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  const handleSelect = (tier) => {
    if (tier.id === "Free") {
      navigate("/free-plan");
    } else {
      setNotice(`Payment page for ${tier.name} tier has been removed/disabled per tier guidelines.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-12">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <Tag variant="brand" size="m">Pricing Plans</Tag>
          <Heading level={1} size="xl">
            Flexible Subscription Tiers
          </Heading>
          <Text variant="tertiary" size="l">
            Choose an affordable plan packed with 2-word AI generation capabilities. Note: Payment pages for Basic and Premium tiers are disabled.
          </Text>
        </div>

        {notice && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-sm text-center">
            {notice}
          </div>
        )}

        <Grid cols={3} gap="8" className="max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              variant={tier.mostPopular ? "glow" : "glass"}
              padding="lg"
              className="flex flex-col justify-between h-full relative"
            >
              <div className="space-y-6">
                <Flex justify="between" align="center">
                  <Heading level={3} size="m">{tier.name}</Heading>
                  {tier.mostPopular ? (
                    <Tag variant="brand" size="m">Most Popular</Tag>
                  ) : (
                    <Tag variant="neutral" size="s">No Payment</Tag>
                  )}
                </Flex>

                <Text variant="secondary" size="sm">
                  {tier.description}
                </Text>

                <div className="py-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    {tier.price}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckIcon className="h-5 w-5 text-indigo-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                {tier.id === "Free" ? (
                  <Button
                    variant="gradient"
                    size="l"
                    className="w-full"
                    onClick={() => handleSelect(tier)}
                  >
                    Select Free Plan
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="l"
                    className="w-full opacity-80 cursor-not-allowed"
                    onClick={() => handleSelect(tier)}
                  >
                    Payment Interface Disabled
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Plans;