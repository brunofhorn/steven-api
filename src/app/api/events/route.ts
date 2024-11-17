import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            include: {
                dates: true,
                categories: true,
                city: true,
                sponsors: true,
                stands: true,
            },
        });

        NextResponse.json(events, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: 'Erro ao buscar eventos', errorDescription: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, description, cityId, dates, categories, price, location, contactInfo, organizer, attractions, schedule } = await request.json();
        const event = await prisma.event.create({
            data: {
                name,
                description,
                cityId,
                dates: {
                    create: dates.map((date: unknown) => ({ date })),
                },
                categories: {
                    connect: categories.map((id: unknown) => ({ id })),
                },
                price,
                location,
                contactInfo,
                organizer,
                attractions,
                schedule,
            },
        });

        NextResponse.json(event, { status: 201 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao criar evento.", errorDescription: error }, { status: 500 });
    }
}
