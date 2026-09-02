import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FiLogOut } from "react-icons/fi";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../apis/user/User";
import { useAuth } from "../../authContext/Authcontext";
import { Button, Flex, Tag } from "../once-ui";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pricing", href: "/plans" },
    { name: "History", href: "/history" },
];

const PrivateNavbar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const mutation = useMutation({ mutationFn: logoutAPI });

    const handleLogout = () => {
        mutation.mutate();
        logout();
    };

    return (
        <Disclosure as="nav" className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <Flex align="center" gap="6">
                                <Link to="/dashboard" className="flex items-center gap-2 text-white">
                                    <FaCreativeCommonsShare className="h-8 w-8 text-indigo-500" />
                                    <span className="font-extrabold text-xl tracking-tight text-white">
                                        Masync AI
                                    </span>
                                </Link>

                                <div className="hidden md:flex md:items-center md:space-x-3">
                                    {navigation.map((item) => {
                                        const isActive = location.pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? "bg-white/10 text-white"
                                                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </Flex>

                            <div className="flex items-center gap-3">
                                <Link to="/generate-content">
                                    <Button
                                        variant="gradient"
                                        size="s"
                                        prefixIcon={<PlusIcon className="h-4 w-4" />}
                                    >
                                        Generate 2-Word Content
                                    </Button>
                                </Link>

                                <Button
                                    onClick={handleLogout}
                                    variant="danger"
                                    size="s"
                                    prefixIcon={<FiLogOut className="h-4 w-4" />}
                                >
                                    Log Out
                                </Button>

                                <div className="flex md:hidden">
                                    <Disclosure.Button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5">
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden border-t border-white/10 bg-slate-950 p-4 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-200 hover:bg-white/10"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default PrivateNavbar;