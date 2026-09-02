import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { Button, Flex, Tag } from "../once-ui";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/plans" },
    { name: "About", href: "/about" }
];

const PublicNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
            <nav className="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8" aria-label="Global">
                <Flex align="center" gap="3">
                    <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
                        <FaCreativeCommonsShare className="h-8 w-8 text-indigo-500" />
                        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                            Masync AI
                        </span>
                    </Link>
                    <Tag variant="brand" size="s">2-Word AI</Tag>
                </Flex>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-slate-400 hover:text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-slate-300 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
                    <Link to="/login">
                        <Button variant="outline" size="s">Log In</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="gradient" size="s">Get Started</Button>
                    </Link>
                </div>
            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-950 px-6 py-6 sm:max-w-sm border-l border-white/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-white" onClick={() => setMobileMenuOpen(false)}>
                            <FaCreativeCommonsShare className="h-8 w-8 text-indigo-500" />
                            <span className="font-bold text-lg">Masync AI</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-slate-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="space-y-2 py-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-xl px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-white/10"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-4 border-t border-white/10 space-y-3">
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                                <Button variant="outline" size="m" className="w-full">Log In</Button>
                            </Link>
                            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                                <Button variant="gradient" size="m" className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default PublicNavbar;