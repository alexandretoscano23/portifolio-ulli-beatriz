"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Video } from "@/types/video"

type Category = "videomaker" | "storymaker"
type MediaType = "video" | "image"

export default function PageAdmin() {
    const [category, setCategory] = useState<Category>("videomaker")
    const [type, setType] = useState<MediaType>("video")
    const [name, setName] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [mediaList, setMediaList] = useState<Video[]>([])

    const fetchMedia = async () => {
        const { data, error } = await supabase
            .from("videos")
            .select("*")
            .order("created_at", { ascending: false })

        if (!error && data) setMediaList(data as Video[])
    }

    useEffect(() => {
        fetchMedia()
    }, [])

    const handleDelete = async (item: Video) => {
        const confirmed = confirm(`Deletar "${item.name}"?`)
        if (!confirmed) return

        const path = item.src.split("/storage/v1/object/public/media/")[1]
        await supabase.storage.from("media").remove([path])
        await supabase.from("videos").delete().eq("id", item.id)
        fetchMedia()
    }

    const handleSubmit = async () => {
        if (!file || !name) return

        setLoading(true)
        setSuccess(false)

        try {
            const fileExt = file.name.split(".").pop()
            const fileName = `${category}/${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from("media")
                .upload(fileName, file)

            if (uploadError) throw uploadError

            const { data: urlData } = supabase.storage
                .from("media")
                .getPublicUrl(fileName)

            const src = urlData.publicUrl

            const { error: dbError } = await supabase
                .from("videos")
                .insert({ src, name, category, type })

            if (dbError) throw dbError

            setSuccess(true)
            setName("")
            setFile(null)
            fetchMedia()

        } catch (err) {
            console.error(err)
            alert("Erro ao publicar. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    // Contagem de nomes
    const nameCount: Record<string, number> = {}
    const nameIndex: Record<string, number> = {}

    mediaList.forEach((item) => {
        nameCount[item.name] = (nameCount[item.name] || 0) + 1
    })

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#f9f9f7] py-10 px-6 gap-8">

            {/* Formulário de upload */}
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6">
                <h1 className="text-xl font-semibold">Publicar Conteúdo</h1>

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
                                <span>{t === "video" ? "Vídeo" : "Foto"}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-2">CATEGORIA</p>
                    <div className="flex gap-2">
                        {(["videomaker", "storymaker"] as Category[]).map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`px-4 py-2 rounded-lg border text-sm capitalize transition cursor-pointer ${category === c
                                        ? "bg-[#8B1A2B] text-white border-[#8B1A2B]"
                                        : "bg-white text-gray-600 border-gray-300"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

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

                <div>
                    <label className="text-sm text-gray-500 mb-2 block">ARQUIVO</label>
                    <label className="w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-gray-400 transition">
                        <span className="text-2xl mb-2">↑</span>
                        <span className="text-sm text-gray-500 text-center px-4">
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

            {/* Lista de mídias publicadas */}
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Conteúdo Publicado</h2>

                {mediaList.length === 0 ? (
                    <p className="text-sm text-gray-400">Nenhum conteúdo publicado ainda.</p>
                ) : (
                    mediaList.map((item) => {
                        nameIndex[item.name] = (nameIndex[item.name] || 0) + 1
                        const displayName = nameCount[item.name] > 1
                            ? `${item.name} (${nameIndex[item.name]})`
                            : item.name

                        return (
                            <div key={item.id} className="flex items-center justify-between border-b pb-3">
                                <div>
                                    <p className="text-sm font-semibold">{displayName}</p>
                                    <p className="text-xs text-gray-400">{item.category} • {item.type}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                                >
                                    Deletar
                                </button>
                            </div>
                        )
                    })
                )}
            </div>

        </div>
    )
}