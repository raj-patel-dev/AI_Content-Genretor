import React from "react";
import HomeFeatures from "./HomeFeatures";
import FreeTrial from "./FreeTrial";
import { Link } from "react-router-dom";
import { Heading, Text, Button, Tag, Flex } from "../once-ui";
import { FaMagic, FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
        <>
            <div className="bg-slate-950 min-h-[85vh] flex items-center justify-center relative overflow-hidden py-24 px-6 lg:px-8">
                {/* Background glow effects */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 blur-[160px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-4xl text-center relative z-10 space-y-8">
                    <Flex justify="center">
                        <Tag variant="brand" size="m">
                            <FaMagic className="mr-1.5 text-indigo-400" />
                            Announcing Masync AI 2-Word Content Generation
                        </Tag>
                    </Flex>

                    <Heading level={1} size="xl" className="tracking-tight text-white leading-tight">
                        Masync AI Content Generator
                    </Heading>

                    <Text variant="tertiary" size="l" className="max-w-2xl mx-auto leading-relaxed">
                        Masync AI generates rapid 2-word concise content outputs designed to boost your workflow efficiency and spark immediate creative inspiration.
                    </Text>

                    <Flex justify="center" align="center" gap="4" wrap="wrap" className="pt-4">
                        <Link to="/free-plan">
                            <Button variant="gradient" size="l" suffixIcon={<FaArrowRight />}>
                                Start Free 3-Day Trial
                            </Button>
                        </Link>
                        <Link to="/plans">
                            <Button variant="outline" size="l">
                                View Subscription Tiers
                            </Button>
                        </Link>
                    </Flex>
                </div>
            </div>

            {/* Homepage features */}
            <HomeFeatures />

            {/* Homepage CTA */}
            <FreeTrial />
        </>
    );
};

export default Home;