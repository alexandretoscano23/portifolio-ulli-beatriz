import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Video } from "@/types/video"

export const useMedia = (category: "videomaker" | "storymaker") => {
    const [items, setItems] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMedia = async () => {
            const { data, error } = await supabase
                .from("videos")
                .select("*")
                .eq("category", category)
                .order("created_at", { ascending: false })

            if (!error && data) {
                setItems(data as Video[])
            }

            setLoading(false)
        }

        fetchMedia()
    }, [category])

    return { items, loading }
}