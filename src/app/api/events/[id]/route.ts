import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: {
                dates: true,
                categories: true,
                city: true,
                sponsors: true,
                stands: true,
            },
        });

        NextResponse.json(event, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao buscar evento.", erroDescription: error }, { status: 500 });
    }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        const { title, description, cityId, dates, categories, price, location, contactInfo, organizer, attractions, schedule } = await request.json();

        const event = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                cityId,
                dates: {
                    deleteMany: {},
                    create: dates.map((date: unknown) => ({ date })),
                },
                categories: {
                    set: categories.map((id: unknown) => ({ id })),
                },
                price,
                location,
                contactInfo,
                organizer,
                attractions,
                schedule,
            },
        });

        NextResponse.json(event, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: "Erro ao atualizar o evento.", errorDescription: error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string; }; }) {
    try {
        await prisma.event.delete({
            where: { id: parseInt(id) },
        });

        NextResponse.json({ success: true }, { status: 204 });
    } catch (error) {
        NextResponse.json({ success: false, error: "Erro ao excluir o evento.", errorDescription: error }, { status: 500 });
    }
}
