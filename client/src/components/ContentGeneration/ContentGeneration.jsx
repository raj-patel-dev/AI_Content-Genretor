import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getUserProfileAPI } from "../../apis/user/User";
import StatusMessage from "../Alert/StatusMessage";
import { Chatgpt } from "../../apis/chatgpt/Chatgpt";
import { formatTwoWords } from "../../utils/formatTwoWords";
import { Card, Heading, Text, Button, Input, Select, Tag, Flex } from "../once-ui";
import { FaHistory, FaMagic, FaLayerGroup, FaList, FaAlignLeft } from "react-icons/fa";

const ContentGeneration = () => {
    const [generatedContent, setGeneratedContent] = useState("");
    const [displayFormat, setDisplayFormat] = useState("single-line"); // "single-line" | "two-line"
    const [selectedPlanOption, setSelectedPlanOption] = useState("Basic");

    // Get user profile
    const {
        isLoading,
        isError,
        data,
        error,
    } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["profile"],
    });

    // Generate content mutation
    const mutation = useMutation({
        mutationFn: Chatgpt,

        onSuccess: (response) => {
            console.log("AI Response:", response);
            const content = response?.content || response?.data?.content || "";
            // Enforce 2-word limit on display
            setGeneratedContent(formatTwoWords(content));
        },

        onError: (error) => {
            console.error("AI Error:", error);
        },
    });

    const formik = useFormik({
        initialValues: {
            prompt: "",
            tone: "",
            category: "",
        },

        validationSchema: Yup.object({
            prompt: Yup.string().required("A prompt is required"),
            tone: Yup.string().required("Selecting a tone is required"),
            category: Yup.string().required("Selecting a category is required"),
        }),

        onSubmit: (values) => {
            const finalPrompt = `
Generate a blog post about "${values.prompt}"
in the ${values.category} category
with a ${values.tone} tone.
            `.trim();

            mutation.mutate(finalPrompt);
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
                <StatusMessage type="loading" message="Loading profile..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
                <StatusMessage
                    type="error"
                    message={
                        error?.response?.data?.message ||
                        "Failed to load user profile"
                    }
                />
            </div>
        );
    }

    const formattedWords = formatTwoWords(generatedContent).split(/\s+/).filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6 sm:p-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

            <Card variant="glow" padding="lg" className="max-w-2xl w-full z-10 space-y-6">
                <Flex direction="column" gap="6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <Heading level={1} size="xl" className="tracking-tight">
                            AI Content Generator
                        </Heading>
                        <Text variant="tertiary" size="sm">
                            Powered by Google Gemini API. Generates 2-word content displayed under the button in single-line or 2-line formats.
                        </Text>
                    </div>

                    {/* Section 1: Pricing Plan Options (Basic & Premium Tiers) */}
                    <div className="space-y-2">
                        <Text variant="secondary" size="xs" weight="semibold" className="uppercase tracking-wider">
                            Select Subscription Plan Tier
                        </Text>
                        <Flex gap="3">
                            <button
                                type="button"
                                onClick={() => setSelectedPlanOption("Basic")}
                                className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                                    selectedPlanOption === "Basic"
                                        ? "bg-indigo-600/20 border-indigo-500/80 text-white"
                                        : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                                }`}
                            >
                                <Flex justify="between" align="center">
                                    <Text variant="primary" weight="bold" size="sm">Basic Plan</Text>
                                    <Tag variant="brand" size="s">50 Credits</Tag>
                                </Flex>
                                <Text variant="tertiary" size="xs" className="mt-1">Standard 2-word generation limits</Text>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedPlanOption("Premium")}
                                className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                                    selectedPlanOption === "Premium"
                                        ? "bg-purple-600/20 border-purple-500/80 text-white"
                                        : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                                }`}
                            >
                                <Flex justify="between" align="center">
                                    <Text variant="primary" weight="bold" size="sm">Premium Plan</Text>
                                    <Tag variant="purple" size="s">100 Credits</Tag>
                                </Flex>
                                <Text variant="tertiary" size="xs" className="mt-1">Expanded credit allowance</Text>
                            </button>
                        </Flex>
                    </div>

                    {/* Status Alerts */}
                    {mutation.isPending && (
                        <StatusMessage type="loading" message="Fetching Gemini content..." />
                    )}

                    {mutation.isSuccess && (
                        <StatusMessage type="success" message="Gemini content generated below!" />
                    )}

                    {mutation.isError && (
                        <StatusMessage
                            type="error"
                            message={
                                mutation.error?.response?.data?.message ||
                                mutation.error?.message ||
                                "Failed to generate content"
                            }
                        />
                    )}

                    {/* User Profile Plan Badges */}
                    <Flex justify="between" align="center" wrap="wrap" gap="3" className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                        <Tag variant="brand" size="m">
                            Active Account Plan: {data?.user?.subscriptionPlan || "Free"}
                        </Tag>
                        <Tag variant="purple" size="m">
                            Credits: {data?.user?.apiRequestCount || 0} / {data?.user?.monthlyRequestCount || 0}
                        </Tag>
                    </Flex>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <Input
                            id="prompt"
                            label="Topic or Idea"
                            placeholder="e.g. Quantum Computing"
                            {...formik.getFieldProps("prompt")}
                            error={formik.touched.prompt && formik.errors.prompt ? formik.errors.prompt : null}
                        />

                        <Select
                            id="tone"
                            label="Select Tone"
                            {...formik.getFieldProps("tone")}
                            error={formik.touched.tone && formik.errors.tone ? formik.errors.tone : null}
                        >
                            <option value="" className="bg-slate-900 text-slate-400">Choose a tone...</option>
                            <option value="formal" className="bg-slate-900 text-white">Formal</option>
                            <option value="informal" className="bg-slate-900 text-white">Informal</option>
                            <option value="humorous" className="bg-slate-900 text-white">Humorous</option>
                        </Select>

                        <Select
                            id="category"
                            label="Select Category"
                            {...formik.getFieldProps("category")}
                            error={formik.touched.category && formik.errors.category ? formik.errors.category : null}
                        >
                            <option value="" className="bg-slate-900 text-slate-400">Choose a category...</option>
                            <option value="technology" className="bg-slate-900 text-white">Technology</option>
                            <option value="health" className="bg-slate-900 text-white">Health</option>
                            <option value="business" className="bg-slate-900 text-white">Business</option>
                        </Select>

                        {/* Section 2: Gemini Generation Button */}
                        <Button
                            type="submit"
                            variant="gradient"
                            size="l"
                            className="w-full"
                            loading={mutation.isPending}
                            prefixIcon={<FaMagic className="mr-1" />}
                        >
                            Generate Content with Gemini
                        </Button>

                        <Flex justify="end">
                            <Link to="/history" className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                                <FaHistory /> View Content History
                            </Link>
                        </Flex>
                    </form>

                    {/* Section 3: Gemini Content Output Under Button with Single-line vs 2-line Layout formatting */}
                    {generatedContent && (
                        <Card variant="solid" padding="md" className="border-indigo-500/40 bg-slate-900/90 shadow-xl space-y-3">
                            <Flex justify="between" align="center" wrap="wrap" gap="2">
                                <Text variant="brand" size="xs" weight="semibold" className="uppercase tracking-wider">
                                    Gemini Generated Content
                                </Text>
                                <Flex align="center" gap="2">
                                    <span className="text-xs text-slate-400">Display Layout:</span>
                                    <button
                                        type="button"
                                        onClick={() => setDisplayFormat("single-line")}
                                        className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                                            displayFormat === "single-line"
                                                ? "bg-indigo-600 text-white font-semibold"
                                                : "bg-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        <FaAlignLeft /> Single Line
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDisplayFormat("two-line")}
                                        className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                                            displayFormat === "two-line"
                                                ? "bg-indigo-600 text-white font-semibold"
                                                : "bg-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        <FaList /> 2-Line Format
                                    </button>
                                </Flex>
                            </Flex>

                            {/* Content Display Presentation */}
                            <div className="p-4 bg-slate-950/90 rounded-xl border border-indigo-500/20 text-center">
                                {displayFormat === "single-line" ? (
                                    /* Single-line Format */
                                    <p className="text-2xl font-extrabold text-white tracking-wide leading-none py-2">
                                        "{formattedWords.join(" ")}"
                                    </p>
                                ) : (
                                    /* 2-Line Format */
                                    <div className="space-y-1 py-2">
                                        {formattedWords.map((word, idx) => (
                                            <p key={idx} className="text-xl font-bold text-indigo-300 tracking-wider">
                                                {word}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}
                </Flex>
            </Card>
        </div>
    );
};

export default ContentGeneration;
