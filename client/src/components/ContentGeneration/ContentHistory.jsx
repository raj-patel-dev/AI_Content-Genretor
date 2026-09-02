import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaRegEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { getUserProfileAPI } from '../../apis/user/User';
import StatusMessage from '../Alert/StatusMessage';
import { Link } from "react-router-dom";
import { formatTwoWords } from '../../utils/formatTwoWords';
import { Card, Heading, Text, Button, Tag, Flex } from '../once-ui';

const ContentHistory = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["profile"]
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
                <StatusMessage type="loading" message="Loading history..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
                <StatusMessage type="error" message={error?.response?.data?.message || "Error loading history"} />
            </div>
        );
    }

    const historyItems = data?.user?.contentHistory || [];

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <Flex justify="between" align="center" wrap="wrap" gap="4">
                    <div>
                        <Heading level={1} size="xl">Content Generation History</Heading>
                        <Text variant="tertiary" size="sm" className="mt-1">
                            Review your previously generated 2-word content outputs.
                        </Text>
                    </div>
                    <Link to="/generate-content">
                        <Button variant="gradient" prefixIcon={<FaPlus />}>
                            Create New Content
                        </Button>
                    </Link>
                </Flex>

                <Card variant="glass" padding="md">
                    {historyItems.length <= 0 ? (
                        <div className="py-12 text-center">
                            <Text variant="tertiary" size="m">No content history found.</Text>
                            <Link to="/generate-content" className="mt-4 inline-block">
                                <Button variant="outline" size="s">Generate your first 2-word output</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/10">
                            {historyItems.map((item, index) => {
                                const formattedText = formatTwoWords(item?.content);
                                return (
                                    <div key={item?._id || index} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 px-4 rounded-xl transition-colors">
                                        <div className="space-y-1">
                                            <Flex align="center" gap="3">
                                                <Text variant="primary" weight="bold" size="l">
                                                    "{formattedText}"
                                                </Text>
                                                <Tag variant="brand" size="s">2 Words</Tag>
                                            </Flex>
                                            <Text variant="tertiary" size="xs">
                                                {new Date(item?.createdAt).toLocaleString()}
                                            </Text>
                                        </div>
                                        <Flex align="center" gap="3">
                                            <button title="View" className="p-2 text-slate-400 hover:text-emerald-400 transition-colors">
                                                <FaEye />
                                            </button>
                                            <button title="Edit" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                                                <FaRegEdit />
                                            </button>
                                            <button title="Delete" className="p-2 text-slate-400 hover:text-rose-400 transition-colors">
                                                <FaTrashAlt />
                                            </button>
                                        </Flex>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ContentHistory;
