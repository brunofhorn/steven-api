import Layout from "@/components/layout/Layout";
import StatsCard from "@/components/StatsCard";
import { Calendar, Store, Users, Handshake } from "lucide-react";

const Dashboard = () => {
    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Bem-vindo ao seu painel de gerenciamento de eventos
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total de Eventos"
                    value="12"
                    icon={Calendar}
                    description="2 eventos este mês"
                />
                <StatsCard
                    title="Estandes"
                    value="48"
                    icon={Store}
                    description="85% ocupação"
                />
                <StatsCard
                    title="Usuários"
                    value="1,234"
                    icon={Users}
                    description="+22% este mês"
                />
                <StatsCard
                    title="Patrocinadores"
                    value="18"
                    icon={Handshake}
                    description="6 novos este mês"
                />
            </div>
        </Layout>
    );
};

export default Dashboard;