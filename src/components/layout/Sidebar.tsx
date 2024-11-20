"use client";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Tags,
    Store,
    Handshake,
    Calendar,
    Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Tags, label: "Categorias", path: "/dashboard/categories" },
    { icon: Store, label: "Estandes", path: "/dashboard/stands" },
    { icon: Handshake, label: "Patrocinadores", path: "/dashboard/sponsors" },
    { icon: Calendar, label: "Eventos", path: "/dashboard/events" },
    { icon: Users, label: "Usuários", path: "/dashboard/users" },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-30">
            <div className="flex flex-col h-full">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">EventHub</h1>
                </div>

                <nav className="flex-1 px-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                                    "hover:bg-secondary hover:text-primary",
                                    isActive ? "bg-secondary text-primary" : "text-gray-600"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <p className="text-sm text-gray-500">
                        © 2024 EventHub
                    </p>
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;