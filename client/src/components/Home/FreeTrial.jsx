import React from "react";
import { Link } from "react-router-dom";
import { Card, Heading, Text, Button, Flex, Tag } from "../once-ui";
import { FaArrowRight } from "react-icons/fa";

const FreeTrial = () => {
    return (
        <section className="py-20 bg-slate-950 px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <Card variant="glow" padding="lg" className="space-y-6">
                    <Tag variant="success" size="m">3-Day Free Trial</Tag>

                    <Heading level={2} size="xl">
                        Boost your productivity today with Masync AI.
                    </Heading>

                    <Text variant="tertiary" size="l" className="max-w-xl mx-auto">
                        Experience lightning-fast 2-word content generation. Start your 3-day trial free of charge.
                    </Text>

                    <Flex justify="center" align="center" gap="4" wrap="wrap" className="pt-2">
                        <Link to="/free-plan">
                            <Button variant="gradient" size="l" suffixIcon={<FaArrowRight />}>
                                Start Free Trial Now
                            </Button>
                        </Link>
                        <Link to="/plans">
                            <Button variant="outline" size="l">
                                View All Plans
                            </Button>
                        </Link>
                    </Flex>
                </Card>
            </div>
        </section>
    );
};

export default FreeTrial;