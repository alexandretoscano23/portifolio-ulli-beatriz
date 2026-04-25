import { useEffect, useState } from "react"
import { Video } from "@/types/video"

export const useMedia = (category: "videomaker" | "storymaker") => {
    const [items, setItems] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const res = await fetch(`/api/videos?category=${category}`)
                const data = await res.json()
                setItems(data as Video[])
            } catch (error) {
                console.error("Erro ao buscar mídia:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMedia()
    }, [category])

    return { items, loading }
}