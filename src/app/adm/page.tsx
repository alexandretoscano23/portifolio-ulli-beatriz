"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Category = "videomaker" | "storymaker"
type MediaType = "video" | "image"

export default function () {
    const [category, setCategory] = useState<Category>("videomaker")
    const [type, setType] = useState<MediaType>("video")
    const [name, setName] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async () => {
        if (!file || !name) return

        setLoading(true)
        setSuccess(false)

        try {
            // 1. Upload do arquivo no Storage
            const fileExt = file.name.split(".").pop()
            const fileName = `${category}/${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from("videos")
                .upload(fileName, file)

            if (uploadError) throw uploadError

            // 2. Pega a URL pública
            const { data: urlData } = supabase.storage
                .from("videos")
                .getPublicUrl(fileName)

            const src = urlData.publicUrl

            // 3. Salva na tabela videos
            const { error: dbError } = await supabase
                .from("videos")
                .insert({ src, name, category, type })

            if (dbError) throw dbError

            setSuccess(true)
            setName("")
            setFile(null)

        } catch (err) {
            console.error(err)
            alert("Erro ao publicar. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9f7]">
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6">
                <h1 className="text-xl font-semibold">Publicar Conteúdo</h1>

                {/* Tipo de arquivo */}
                <div>
                    <p className="text-sm text-gray-500 mb-2">TIPO DE ARQUIVO</p>
                    <div className="flex gap-4">
                        {(["video", "image"] as MediaType[]).map((t) => (
                            <label key={t} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="type"
                                    value={t}
                                    checked={type === t}
                                    onChange={() => setType(t)}
                                />
                                <span className="capitalize">{t === "video" ? "Vídeo" : "Foto"}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categoria */}
                <div>
                    <p className="text-sm text-gray-500 mb-2">CATEGORIA</p>
                    <div className="flex gap-2">
                        {(["videomaker", "storymaker"] as Category[]).map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`px-4 py-2 rounded-lg border text-sm capitalize transition ${category === c
                                    ? "bg-[#8B1A2B] text-white border-[#8B1A2B]"
                                    : "bg-white text-gray-600 border-gray-300"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nome/Título */}
                <div>
                    <label className="text-sm text-gray-500 mb-2 block">TÍTULO</label>
                    <input
                        type="text"
                        placeholder="Nome da empresa..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-400"
                    />
                </div>

                {/* Upload */}
                <div>
                    <label className="text-sm text-gray-500 mb-2 block">ARQUIVO</label>
                    <label className="w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-gray-400 transition">
                        <span className="text-2xl mb-2">↑</span>
                        <span className="text-sm text-gray-500">
                            {file ? file.name : "Arraste seu arquivo aqui ou clique para selecionar"}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            accept={type === "video" ? "video/*" : "image/*"}
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </label>
                </div>

                {/* Botão */}
                <button
                    onClick={handleSubmit}
                    disabled={loading || !file || !name}
                    className="w-full py-3 rounded-xl bg-gray-200 text-sm font-semibold tracking-widest uppercase transition disabled:opacity-50 hover:bg-gray-300 cursor-pointer"
                >
                    {loading ? "Publicando..." : "Publicar Conteúdo"}
                </button>

                {success && (
                    <p className="text-center text-green-600 text-sm">Publicado com sucesso!</p>
                )}
            </div>
        </div>
    )
}