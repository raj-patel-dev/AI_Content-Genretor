import React from 'react';
import { Card, Grid, Heading, Text, Tag, Flex } from "../once-ui";
import { FaBrain, FaSlidersH, FaBolt } from "react-icons/fa";

const featureList = [
  {
    icon: <FaBrain className="text-indigo-400 text-2xl" />,
    title: "AI 2-Word Content Creation",
    description: "Generates laser-focused, 2-word responses using Gemini 2.5 Flash API to deliver concise ideas instantly.",
  },
  {
    icon: <FaSlidersH className="text-purple-400 text-2xl" />,
    title: "Customizable Tone & Category",
    description: "Tailor responses with distinct tones (Formal, Informal, Humorous) and categories (Tech, Health, Business).",
  },
  {
    icon: <FaBolt className="text-emerald-400 text-2xl" />,
    title: "Streamlined Workflow",
    description: "Eliminate fluff and streamline ideation with rapid history tracking and fast credit processing.",
  },
];

const HomeFeatures = () => {
  return (
    <section className="py-20 bg-slate-950 px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Tag variant="brand" size="m">Features</Tag>
          <Heading level={2} size="xl">Why Masync AI?</Heading>
          <Text variant="tertiary" size="m">
            Engineered for high efficiency, speed, and clean 2-word outputs.
          </Text>
        </div>

        <Grid cols={3} gap="6">
          {featureList.map((item, index) => (
            <Card key={index} variant="glass" padding="lg" className="space-y-4">
              <Flex align="center" justify="center" className="w-12 h-12 bg-white/5 rounded-xl border border-white/10">
                {item.icon}
              </Flex>
              <Heading level={3} size="m">{item.title}</Heading>
              <Text variant="tertiary" size="sm" className="leading-relaxed">
                {item.description}
              </Text>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default HomeFeatures;