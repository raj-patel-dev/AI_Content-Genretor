import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import StatusMessage from "../Alert/StatusMessage";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../apis/user/User";
import { useAuth } from "../../authContext/Authcontext";
import { Card, Heading, Text, Button, Input, Flex, Tag } from "../once-ui";
import { FaSignInAlt } from "react-icons/fa";

const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const mutation = useMutation({
        mutationFn: loginAPI
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        }
    });

    useEffect(() => {
        if (mutation.isSuccess) {
            login();
            navigate("/dashboard");
        }
    }, [mutation.isSuccess, login, navigate]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

            <Card variant="glow" padding="lg" className="max-w-md w-full z-10">
                <Flex direction="column" gap="6">
                    <div className="text-center space-y-2">
                        <Tag variant="brand" size="m">Account Access</Tag>
                        <Heading level={1} size="l">
                            Login to Your Account
                        </Heading>
                        <Text variant="tertiary" size="sm">
                            Access your AI content generator dashboard.
                        </Text>
                    </div>

                    {mutation.isPending && (
                        <StatusMessage type="loading" message="Signing in..." />
                    )}
                    {mutation.isError && (
                        <StatusMessage
                            type="error"
                            message={mutation?.error?.response?.data?.message || "Login failed"}
                        />
                    )}
                    {mutation.isSuccess && (
                        <StatusMessage type="success" message="Login successful!" />
                    )}

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                            prefixIcon={<FaSignInAlt className="mr-1" />}
                        >
                            Sign In
                        </Button>
                    </form>

                    <Flex justify="center" className="pt-2">
                        <Link to="/register" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                            Don't have an account? Register here
                        </Link>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};

export default Login;
