import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const cities = await prisma.city.findMany();

        NextResponse.json(cities, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao buscar cidades.", errorDescription: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, state, country } = await request.json();
        const city = await prisma.city.create({
            data: {
                name,
                state,
                country,
            },
        });

        NextResponse.json(city, { status: 201 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao criar cidade.", errorDescription: error }, { status: 500 });
    }
}
