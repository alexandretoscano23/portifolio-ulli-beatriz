import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    try {
        const rows = category
            ? await sql`SELECT * FROM videos WHERE category = ${category} ORDER BY created_at DESC`
            : await sql`SELECT * FROM videos ORDER BY created_at DESC`;

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar vídeos" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { src, name, category, type, poster } = await req.json();

        if (!src || !name || !category || !type) {
            return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
        }

        const rows = await sql`
            INSERT INTO videos (src, name, category, type, poster)
            VALUES (${src}, ${name}, ${category}, ${type}, ${poster ?? null})
            RETURNING *
        `;

        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao inserir vídeo" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    }

    try {
        await sql`DELETE FROM videos WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar vídeo" }, { status: 500 });
    }
}