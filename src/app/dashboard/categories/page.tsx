"use client";

import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
}

interface CategoryInput {
    name: string;
}


export default function Categories() {
    const [category, setCategory] = useState<string | number>('');
    const [categoryResult, setCategoryResult] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryName, setCategoryName] = useState("");

    const getCategories = async () => {
        try {
            const response = await fetch('/api/categories');

            if (!response.ok) {
                throw new Error('Erro ao buscar as categorias');
            }

            const data: Category[] = await response.json();

            setCategories(data);
        } catch (error) {
            console.error('Erro ao carregar as categorias:', error);
        } finally {
        }
    };

    const createCategory = async (categoryData: CategoryInput): Promise<void> => {
        try {
            const response = await fetch('/api/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar a categoria');
            }

            const data = await response.json();
            console.log('Categoria cadastrada com sucesso:', data);
        } catch (error) {
            console.error('Erro ao cadastrar categoria:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createCategory({ name: categoryName });
        getCategories();
    };

    const deleteCategory = async (categoryId: number): Promise<void> => {
        try {
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar a categoria');
            }

            console.log('Categoria deletada com sucesso');
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
        }
    };

    const handleDelete = async (categoryId: number) => {
        await deleteCategory(categoryId);

        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
    };

    const fetchCategoryById = async (id: number): Promise<Category | null> => {
        try {
            const response = await fetch(`/api/categories/${id}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar a categoria');
            }

            const data: Category = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            return null;
        }
    };

    const handleSearch = async () => {
        const id = Number(category);
        if (!isNaN(id)) {
            const result = await fetchCategoryById(id);
            setCategoryResult(result);
        } else {
            alert('Por favor, insira um ID válido.');
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center gap-4 divide-y-2">
                <div>
                    <h1>LISTAGEM ({categories.length} cidades)</h1>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                {category.name} - <button onClick={() => handleDelete(category.id)}>REMOVER</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-3">
                    <h1>BUSCA</h1>
                    <input
                        type="text"
                        placeholder="Digite o nome ou ID da cidade"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button onClick={handleSearch}>BUSCAR</button>
                    {categoryResult && (
                        <div className="flex flex-col gap-2">
                            <p>{categoryResult.id}</p>
                            <p>{categoryResult.name}</p>
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <h1>CADASTRAR</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="categoryName" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="border" />
                        <button type="submit">CADASTRAR</button>
                    </form>
                </div>
            </div>
        </>
    );
}