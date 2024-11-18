"use client";

import { useEffect, useState } from "react";

interface City {
    id: number;
    name: string;
    state: string;
}

interface CityInput {
    name: string;
    state: string;
    country: string;
}


export default function Cities() {
    const [city, setCity] = useState<string | number>('');
    const [cityResult, setCityResult] = useState<City | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [cityName, setCityName] = useState("");
    const [cityState, setCityState] = useState("");
    const [cityCountry, setCityCountry] = useState("");

    const getCities = async () => {
        try {
            const response = await fetch('/api/cities');

            if (!response.ok) {
                throw new Error('Erro ao buscar as cidades');
            }

            const data: City[] = await response.json();

            setCities(data);
        } catch (error) {
            console.error('Erro ao carregar as cidades:', error);
        } finally {
        }
    };

    const createCity = async (cityData: CityInput): Promise<void> => {
        try {
            const response = await fetch('/api/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar a cidade');
            }

            const data = await response.json();
            console.log('Cidade cadastrada com sucesso:', data);
        } catch (error) {
            console.error('Erro ao cadastrar cidade:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createCity({ name: cityName, state: cityState, country: cityCountry });
        getCities();
    };

    const deleteCity = async (cityId: number): Promise<void> => {
        try {
            const response = await fetch(`/api/cities/${cityId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar a cidade');
            }

            console.log('Cidade deletada com sucesso');
        } catch (error) {
            console.error('Erro ao deletar cidade:', error);
        }
    };

    const handleDelete = async (cityId: number) => {
        await deleteCity(cityId);

        setCities((prevCities) => prevCities.filter((city) => city.id !== cityId));
    };

    const fetchCityById = async (id: number): Promise<City | null> => {
        try {
            const response = await fetch(`/api/cities/${id}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar a cidade');
            }

            const data: City = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar cidade:', error);
            return null;
        }
    };

    const handleSearch = async () => {
        const id = Number(city);
        if (!isNaN(id)) {
            const result = await fetchCityById(id);
            setCityResult(result);
        } else {
            alert('Por favor, insira um ID válido.');
        }
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center gap-4 divide-y-2">
                <div>
                    <h1>LISTAGEM ({cities.length} cidades)</h1>
                    <ul>
                        {cities.map((city) => (
                            <li key={city.id}>
                                {city.name} - {city.state} - <button onClick={() => handleDelete(city.id)}>REMOVER</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-3">
                    <h1>BUSCA</h1>
                    <input
                        type="text"
                        placeholder="Digite o nome ou ID da cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={handleSearch}>BUSCAR</button>
                    {cityResult && (
                        <div className="flex flex-col gap-2">
                            <p>{cityResult.id}</p>
                            <p>{cityResult.name}</p>
                            <p>{cityResult.state}</p>
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <h1>CADASTRAR</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="cityName" id="cityName" value={cityName} onChange={(e) => setCityName(e.target.value)} className="border" />
                        <input type="text" name="cityState" id="cityState" value={cityState} onChange={(e) => setCityState(e.target.value)} className="border" />
                        <input type="text" name="cityCountry" id="cityCountry" value={cityCountry} onChange={(e) => setCityCountry(e.target.value)} className="border" />
                        <button type="submit">CADASTRAR</button>
                    </form>
                </div>
            </div>
        </>
    );
}