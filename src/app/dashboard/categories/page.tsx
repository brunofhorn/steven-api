"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryList from "@/components/categories/CategoryList";
import CategoryForm from "@/components/categories/CategoryForm";
import { useToast } from "@/hooks/use-toast";

export type Category = {
    id: string;
    name: string;
    image: string;
    description: string;
};

const CategoriesPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([
        {
            id: "1",
            name: "Tecnologia",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            description: "Eventos relacionados à tecnologia e inovação",
        },
        {
            id: "2",
            name: "Literatura",
            image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
            description: "Eventos literários e culturais",
        },
        {
            id: "3",
            name: "Cultura Pop",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            description: "Eventos de cultura pop e entretenimento",
        },
    ]);
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        setCategories(categories.filter((category) => category.id !== id));
        toast({
            title: "Categoria excluída",
            description: "A categoria foi excluída com sucesso",
        });
    };

    const handleSave = (category: Omit<Category, "id">) => {
        const newCategory = {
            ...category,
            id: Math.random().toString(36).substr(2, 9),
        };
        setCategories([...categories, newCategory]);
        setIsFormOpen(false);
        toast({
            title: "Categoria criada",
            description: "A categoria foi criada com sucesso",
        });
    };

    return (
        <Layout>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Categorias</h1>
                        <p className="text-gray-600 mt-2">
                            Gerencie as categorias de eventos
                        </p>
                    </div>
                    <Button onClick={() => setIsFormOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Categoria
                    </Button>
                </div>
            </div>

            {isFormOpen ? (
                <CategoryForm onSave={handleSave} onCancel={() => setIsFormOpen(false)} />
            ) : (
                <CategoryList categories={categories} onDelete={handleDelete} />
            )}
        </Layout>
    );
};

export default CategoriesPage;