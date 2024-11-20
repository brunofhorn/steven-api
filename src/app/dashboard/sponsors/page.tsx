"use client";

import { useEffect, useState } from "react";

interface Sponsor {
    id: number;
    name: string;
    logoUrl: string;
    contact: string;
}

interface SponsorInput {
    name: string;
    logoUrl: string;
    contact: string;
}


export default function Sponsors() {
    const [sponsor, setSponsor] = useState<string | number>('');
    const [sponsorResult, setSponsorResult] = useState<Sponsor | null>(null);
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [sponsorName, setSponsorName] = useState("");
    const [sponsorLogoUrl, setSponsorLogoUrl] = useState("");
    const [sponsorContact, setSponsorContact] = useState("");

    const getSponsors = async () => {
        try {
            const response = await fetch('/api/sponsors');

            if (!response.ok) {
                throw new Error('Erro ao buscar os patrocinadores');
            }

            const data: Sponsor[] = await response.json();

            setSponsors(data);
        } catch (error) {
            console.error('Erro ao carregar os patrocinadores:', error);
        } finally {
        }
    };

    const createSponsor = async (sponsorData: SponsorInput): Promise<void> => {
        try {
            const response = await fetch('/api/sponsors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sponsorData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o patrocinador');
            }

            const data = await response.json();
            console.log('Patrocinador cadastrado com sucesso:', data);
        } catch (error) {
            console.error('Erro ao cadastrar um patrocinador:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createSponsor({ name: sponsorName, logoUrl: sponsorLogoUrl, contact: sponsorContact });
        getSponsors();
    };

    const deleteSponsor = async (sponsorId: number): Promise<void> => {
        try {
            const response = await fetch(`/api/sponsors/${sponsorId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar o patrocinador');
            }

            console.log('Patrocinador deletado com sucesso');
        } catch (error) {
            console.error('Erro ao deletar o patrocinador:', error);
        }
    };

    const handleDelete = async (sponsorId: number) => {
        await deleteSponsor(sponsorId);

        setSponsors((prevSponsors) => prevSponsors.filter((sponsor) => sponsor.id !== sponsorId));
    };

    const fetchSponsorById = async (id: number): Promise<Sponsor | null> => {
        try {
            const response = await fetch(`/api/sponsors/${id}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar o patrocinador');
            }

            const data: Sponsor = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar o patrocinador:', error);
            return null;
        }
    };

    const handleSearch = async () => {
        const id = Number(sponsor);
        if (!isNaN(id)) {
            const result = await fetchSponsorById(id);
            setSponsorResult(result);
        } else {
            alert('Por favor, insira um ID válido.');
        }
    };

    useEffect(() => {
        getSponsors();
    }, []);

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center gap-4 divide-y-2">
                <div>
                    <h1>LISTAGEM ({sponsors.length} estandes)</h1>
                    <ul>
                        {sponsors.map((sponsor) => (
                            <li key={sponsor.id}>
                                {sponsor.name} - {sponsor.logoUrl} -  {sponsor.contact} <button onClick={() => handleDelete(sponsor.id)}>REMOVER</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-3">
                    <h1>BUSCA</h1>
                    <input
                        type="text"
                        placeholder="Digite o nome ou ID do estande"
                        value={sponsor}
                        onChange={(e) => setSponsor(e.target.value)}
                    />
                    <button onClick={handleSearch}>BUSCAR</button>
                    {sponsorResult && (
                        <div className="flex flex-col gap-2">
                            <p>{sponsorResult.id}</p>
                            <p>{sponsorResult.name}</p>
                            <p>{sponsorResult.logoUrl}</p>
                            <p>{sponsorResult.contact}</p>
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <h1>CADASTRAR</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="sponsorName" id="sponsorName" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} className="border" />
                        <input type="text" name="sponsorLogoUrl" id="sponsorLogoUrl" value={sponsorLogoUrl} onChange={(e) => setSponsorLogoUrl(e.target.value)} className="border" />
                        <input type="text" name="sponsorContact" id="sponsorContact" value={sponsorContact} onChange={(e) => setSponsorContact(e.target.value)} className="border" />
                        <button type="submit">CADASTRAR</button>
                    </form>
                </div>
            </div>
        </>
    );
}