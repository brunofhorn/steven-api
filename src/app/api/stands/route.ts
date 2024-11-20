import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stands = await prisma.eventStand.findMany();

        return NextResponse.json(stands, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar os estandes.", errorDescription: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, description, contact } = await request.json();

        const stand = await prisma.eventStand.create({
            data: {
                name,
                description,
                contact,
            },
        });

        return NextResponse.json(stand, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar um estande.", errorDescription: error }, { status: 500 });
    }
}
