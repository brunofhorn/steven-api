import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.eventCategory.findMany();

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar categorias.", errorDescription: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const category = await prisma.eventCategory.create({
            data: {
                name,
            },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar categoria.", errorDescription: error }, { status: 500 });
    }
}
