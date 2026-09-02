import React from 'react';
import { Card, Grid, Heading, Text, Tag, Flex } from "../once-ui";
import { CloudArrowUpIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/react/20/solid';

const features = [
  {
    name: "Fast 2-Word Generation",
    description: "Gemini 2.5 Flash API configured with system constraints to guarantee max 2-word responses every single time.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure Subscription Management",
    description: "Role-based subscription handling with restricted payment pages for Basic and Premium tiers.",
    icon: LockClosedIcon,
  },
  {
    name: "Content History & Credits",
    description: "Track credit usage, request limits, and previous 2-word AI responses directly in your account history.",
    icon: ArrowPathIcon,
  }
];

const Features = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-20 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Tag variant="brand" size="m">Platform Overview</Tag>
          <Heading level={1} size="xl">
            Everything You Need for 2-Word AI Generation
          </Heading>
          <Text variant="tertiary" size="m">
            High performance, zero bloat, concise output system.
          </Text>
        </div>

        <Grid cols={3} gap="6">
          {features.map((feature) => (
            <Card key={feature.name} variant="glass" padding="lg" className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <Flex align="center" justify="center" className="w-12 h-12 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </Flex>
                <Heading level={3} size="m">{feature.name}</Heading>
                <Text variant="tertiary" size="sm" className="leading-relaxed">
                  {feature.description}
                </Text>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Features;