import React from 'react';
import { Card, Grid, Heading, Text, Tag, Flex } from "../once-ui";
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from '@heroicons/react/20/solid';

const cards = [
  {
    name: "Innovative Solutions",
    description: "At Masync, innovation drives our solutions. We specialize in transforming complex AI technology into user-friendly tools for concise 2-word content generation.",
    icon: PhoneIcon,
  },
  {
    name: "Dedicated Support",
    description: "We empower users with continuous support. Our team is available to assist with any questions regarding credit usage or tier access.",
    icon: LifebuoyIcon,
  },
  {
    name: "Media Collaborations",
    description: "Masync is at the forefront of AI-driven content efficiency. We collaborate with partners to shape the future of high-impact micro-content.",
    icon: NewspaperIcon,
  },
];

export default function AboutUs() {
  return (
    <div className="bg-slate-950 min-h-screen py-20 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Tag variant="purple" size="m">About Masync AI</Tag>
          <Heading level={1} size="xl">
            Redefining Concise Content Creation
          </Heading>
          <Text variant="tertiary" size="l">
            Masync AI automates and enhances content generation by delivering ultra-concise, high-impact 2-word outputs powered by state-of-the-art LLMs.
          </Text>
        </div>

        <Grid cols={3} gap="6">
          {cards.map((card) => (
            <Card key={card.name} variant="glass" padding="lg" className="space-y-4">
              <Flex align="center" gap="3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <card.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <Heading level={3} size="m">{card.name}</Heading>
              </Flex>
              <Text variant="tertiary" size="sm" className="leading-relaxed">
                {card.description}
              </Text>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
}