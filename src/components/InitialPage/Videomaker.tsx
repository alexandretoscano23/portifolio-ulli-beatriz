"use client"

import { DivLine } from "../DivLine"
import { SectionModalImage } from "./ModalImage/SectionModalImage"
import { useMedia } from "@/types/useMedia"

export default function Videomaker() {
    const { items, loading } = useMedia("videomaker")

    return (
        <div id="videomaker">
            <DivLine />
            {loading ? (
                <p className="text-sm text-gray-400">Carregando...</p>
            ) : (
                <SectionModalImage
                    items={items}
                    title="Videomaker"
                    subtitle="Veja algumas das minhas produções:"
                />
            )}
        </div>
    )
}