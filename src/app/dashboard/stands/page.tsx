"use client";

import { useEffect, useState } from "react";

interface Stand {
    id: number;
    name: string;
    description: string;
    contact: string;
}

interface StandInput {
    name: string;
    description: string;
    contact: string;
}


export default function Stands() {
    const [stand, setStand] = useState<string | number>('');
    const [standResult, setStandResult] = useState<Stand | null>(null);
    const [stands, setStands] = useState<Stand[]>([]);
    const [standName, setStandName] = useState("");
    const [standDescription, setStandDescription] = useState("");
    const [standContact, setStandContact] = useState("");

    const getStands = async () => {
        try {
            const response = await fetch('/api/stands');

            if (!response.ok) {
                throw new Error('Erro ao buscar os estandes');
            }

            const data: Stand[] = await response.json();

            setStands(data);
        } catch (error) {
            console.error('Erro ao carregar os estandes:', error);
        } finally {
        }
    };

    const createStand = async (standData: StandInput): Promise<void> => {
        try {
            const response = await fetch('/api/stands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(standData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o estande');
            }

            const data = await response.json();
            console.log('Estande cadastrado com sucesso:', data);
        } catch (error) {
            console.error('Erro ao cadastrar um estande:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createStand({ name: standName, description: standDescription, contact: standContact });
        getStands();
    };

    const deleteStand = async (standId: number): Promise<void> => {
        try {
            const response = await fetch(`/api/stands/${standId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar o estande');
            }

            console.log('Estande deletado com sucesso');
        } catch (error) {
            console.error('Erro ao deletar o estande:', error);
        }
    };

    const handleDelete = async (standId: number) => {
        await deleteStand(standId);

        setStands((prevStands) => prevStands.filter((stand) => stand.id !== standId));
    };

    const fetchStandById = async (id: number): Promise<Stand | null> => {
        try {
            const response = await fetch(`/api/stands/${id}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar o estande');
            }

            const data: Stand = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar estande:', error);
            return null;
        }
    };

    const handleSearch = async () => {
        const id = Number(stand);
        if (!isNaN(id)) {
            const result = await fetchStandById(id);
            setStandResult(result);
        } else {
            alert('Por favor, insira um ID válido.');
        }
    };

    useEffect(() => {
        getStands();
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center gap-4 divide-y-2">
                <div>
                    <h1>LISTAGEM ({stands.length} estandes)</h1>
                    <ul>
                        {stands.map((stand) => (
                            <li key={stand.id}>
                                {stand.name} - {stand.description} -  {stand.contact} <button onClick={() => handleDelete(stand.id)}>REMOVER</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-3">
                    <h1>BUSCA</h1>
                    <input
                        type="text"
                        placeholder="Digite o nome ou ID do estande"
                        value={stand}
                        onChange={(e) => setStand(e.target.value)}
                    />
                    <button onClick={handleSearch}>BUSCAR</button>
                    {standResult && (
                        <div className="flex flex-col gap-2">
                            <p>{standResult.id}</p>
                            <p>{standResult.name}</p>
                            <p>{standResult.description}</p>
                            <p>{standResult.contact}</p>
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <h1>CADASTRAR</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="standName" id="standName" value={standName} onChange={(e) => setStandName(e.target.value)} className="border" />
                        <input type="text" name="standDescription" id="standDescription" value={standDescription} onChange={(e) => setStandDescription(e.target.value)} className="border" />
                        <input type="text" name="standContact" id="standContact" value={standContact} onChange={(e) => setStandContact(e.target.value)} className="border" />
                        <button type="submit">CADASTRAR</button>
                    </form>
                </div>
            </div>
        </>
    );
}