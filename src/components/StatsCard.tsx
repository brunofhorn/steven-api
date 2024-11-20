import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
}

const StatsCard = ({ title, value, icon: Icon, description }: StatsCardProps) => {
    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    {description && (
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    )}
                </div>
                <Icon className="w-8 h-8 text-primary" />
            </div>
        </Card>
    );
};

export default StatsCard;