"use client"

import { DivLine } from "../DivLine"
import { SectionModalImage } from "./ModalImage/SectionModalImage"
import { useMedia } from "@/types/useMedia"

export const Storymaker = () => {
    const { items, loading } = useMedia("storymaker")

    return (
        <section id="storymaker" className="overflow-hidden">
            <DivLine />
            {loading ? (
                <p className="text-sm text-gray-400">Carregando...</p>
            ) : (
                <SectionModalImage
                    items={items}
                    title="Storymaker"
                    subtitle="Veja algumas das minhas produções:"
                />
            )}
        </section>
    )
}