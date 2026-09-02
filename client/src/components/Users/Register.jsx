import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../apis/user/User";
import StatusMessage from "../Alert/StatusMessage";
import { useAuth } from "../../authContext/Authcontext";
import { Card, Heading, Text, Button, Input, Flex, Tag } from "../once-ui";
import { FaUserPlus } from "react-icons/fa";

const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required")
});

const Registration = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const mutation = useMutation({
        mutationFn: registerAPI
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values, {
                onSuccess: () => navigate("/login"),
            });
        }
    });

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

            <Card variant="glow" padding="lg" className="max-w-md w-full z-10">
                <Flex direction="column" gap="6">
                    <div className="text-center space-y-2">
                        <Tag variant="purple" size="m">Get Started</Tag>
                        <Heading level={1} size="l">
                            Create an Account
                        </Heading>
                        <Text variant="tertiary" size="sm">
                            Get free access for 3 days. No credit card required.
                        </Text>
                    </div>

                    {mutation.isPending && (
                        <StatusMessage type="loading" message="Creating account..." />
                    )}
                    {mutation.isError && (
                        <StatusMessage
                            type="error"
                            message={mutation?.error?.response?.data?.message || "Registration failed"}
                        />
                    )}
                    {mutation.isSuccess && (
                        <StatusMessage type="success" message="Registration successful! Redirecting to login..." />
                    )}

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <Input
                            id="name"
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            {...formik.getFieldProps("name")}
                            error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                        />

                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            {...formik.getFieldProps("email")}
                            error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        />

                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            {...formik.getFieldProps("password")}
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                        />

                        <Button
                            type="submit"
                            variant="gradient"
                            size="l"
                            className="w-full"
                            loading={mutation.isPending}
                            prefixIcon={<FaUserPlus className="mr-1" />}
                        >
                            Register
                        </Button>
                    </form>

                    <Flex justify="center" className="pt-2">
                        <Link to="/login" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                            Already have an account? Login here
                        </Link>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};

export default Registration;
