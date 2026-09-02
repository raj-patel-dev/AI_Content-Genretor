import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfileAPI } from '../../apis/user/User';
import StatusMessage from '../Alert/StatusMessage';
import { Link } from 'react-router-dom';
import { Card, Grid, Heading, Text, Button, Tag, Flex } from '../once-ui';
import { FaUser, FaCreditCard, FaHistory, FaRocket, FaClock } from 'react-icons/fa';

const Dashboard = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["profile"]
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
                <StatusMessage type="loading" message="Loading user dashboard..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
                <StatusMessage type="error" message={error?.response?.data?.message || "Failed to load dashboard"} />
            </div>
        );
    }

    const user = data?.user;
    const creditsRemaining = (user?.monthlyRequestCount || 0) - (user?.apiRequestCount || 0);

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                {/* Header Banner */}
                <Flex justify="between" align="center" wrap="wrap" gap="4" className="p-8 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-white/10 rounded-2xl backdrop-blur-xl">
                    <div className="space-y-1">
                        <Tag variant="brand" size="s">User Control Panel</Tag>
                        <Heading level={1} size="xl">Welcome back, {user?.name}</Heading>
                        <Text variant="tertiary" size="sm">{user?.email}</Text>
                    </div>
                    <Link to="/generate-content">
                        <Button variant="gradient" size="l" prefixIcon={<FaRocket />}>
                            Generate 2-Word Content
                        </Button>
                    </Link>
                </Flex>

                {/* Dashboard Grid */}
                <Grid cols={2} gap="6">
                    {/* Profile Information Card */}
                    <Card variant="glass" padding="md" className="space-y-4">
                        <Flex align="center" gap="3">
                            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                                <FaUser />
                            </div>
                            <Heading level={3} size="m">Profile Information</Heading>
                        </Flex>

                        <div className="space-y-3 pt-2">
                            <div>
                                <Text variant="tertiary" size="xs" weight="semibold" className="uppercase tracking-wider">Full Name</Text>
                                <Text variant="primary" weight="medium" size="m" className="mt-1">{user?.name}</Text>
                            </div>
                            <div>
                                <Text variant="tertiary" size="xs" weight="semibold" className="uppercase tracking-wider">Email Address</Text>
                                <Text variant="primary" weight="medium" size="m" className="mt-1">{user?.email}</Text>
                            </div>
                        </div>
                    </Card>

                    {/* Credit Usage Card */}
                    <Card variant="glass" padding="md" className="space-y-4">
                        <Flex align="center" gap="3">
                            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                                <FaCreditCard />
                            </div>
                            <Heading level={3} size="m">Credit Usage</Heading>
                        </Flex>

                        <Grid cols={2} gap="4" className="pt-2">
                            <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                                <Text variant="tertiary" size="xs">Monthly Credits</Text>
                                <Text variant="primary" weight="bold" size="l">{user?.monthlyRequestCount || 0}</Text>
                            </div>
                            <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                                <Text variant="tertiary" size="xs">Credits Used</Text>
                                <Text variant="brand" weight="bold" size="l">{user?.apiRequestCount || 0}</Text>
                            </div>
                        </Grid>

                        <Flex justify="between" align="center" className="pt-2">
                            <Text variant="secondary" size="sm">Credits Remaining:</Text>
                            <Tag variant={creditsRemaining > 0 ? "success" : "danger"} size="m">
                                {creditsRemaining} Credits
                            </Tag>
                        </Flex>
                    </Card>

                    {/* Current Plan Card */}
                    <Card variant="glass" padding="md" className="space-y-4">
                        <Flex align="center" justify="between">
                            <Heading level={3} size="m">Subscription Plan</Heading>
                            <Tag variant="purple" size="m">{user?.subscriptionPlan || "Free"}</Tag>
                        </Flex>

                        <Text variant="tertiary" size="sm">
                            {user?.subscriptionPlan === "Trial" && "Trial Plan: Includes 1000 request limit."}
                            {user?.subscriptionPlan === "Free" && "Free Plan: Includes 5 request limit per cycle."}
                            {user?.subscriptionPlan === "Basic" && "Basic Plan: Includes 50 request limit."}
                            {user?.subscriptionPlan === "Premium" && "Premium Plan: Includes 100 request limit."}
                        </Text>

                        <div className="pt-2">
                            <Link to="/plans">
                                <Button variant="outline" size="s" className="w-full">
                                    View Subscription Plans
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Trial Information Card */}
                    <Card variant="glass" padding="md" className="space-y-4">
                        <Flex align="center" gap="3">
                            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                                <FaClock />
                            </div>
                            <Heading level={3} size="m">Trial Status</Heading>
                        </Flex>

                        <Flex justify="between" align="center">
                            <Text variant="secondary" size="sm">Trial State:</Text>
                            {user?.trialActive ? (
                                <Tag variant="success" size="s">Active Trial</Tag>
                            ) : (
                                <Tag variant="warning" size="s">Inactive</Tag>
                            )}
                        </Flex>

                        {user?.trialExpires && (
                            <Text variant="tertiary" size="xs">
                                Expires on: {new Date(user.trialExpires).toDateString()}
                            </Text>
                        )}

                        <div className="pt-2">
                            <Link to="/plans">
                                <Button variant="secondary" size="s" className="w-full">
                                    Upgrade Tier
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </Grid>

                {/* Payment History Section */}
                <Card variant="glass" padding="md" className="space-y-4">
                    <Flex align="center" gap="3">
                        <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                            <FaHistory />
                        </div>
                        <Heading level={2} size="m">Payment History</Heading>
                    </Flex>

                    {user?.payments?.length > 0 ? (
                        <div className="divide-y divide-white/10">
                            {user.payments.map((payment, index) => (
                                <div key={payment?._id || index} className="py-3 flex justify-between align-center">
                                    <div>
                                        <Text variant="primary" weight="semibold" size="sm">{payment?.subscriptionPlan} Tier</Text>
                                        <Text variant="tertiary" size="xs">{new Date(payment?.createdAt).toDateString()}</Text>
                                    </div>
                                    <Flex align="center" gap="4">
                                        <Tag variant={payment?.status === "success" || payment?.status === "succeeded" ? "success" : "warning"} size="s">
                                            {payment?.status}
                                        </Tag>
                                        <Text variant="primary" weight="bold" size="sm">${payment?.amount}</Text>
                                    </Flex>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Text variant="tertiary" size="sm" className="py-4 text-center">
                            No payment history available.
                        </Text>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;