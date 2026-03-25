"use client"

import MediaCarousel from "../VideoCarousel"
import { ModalImage } from "./ModalImage"
import { Video } from "@/types/video"

import { useState } from "react"

type Props = {
    items: Video[]
    title?: string
    subtitle?: string
}

export const SectionModalImage = ({ items, title, subtitle }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleOpenModal = (url: string) => {
        setSelectedImage(url)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedImage("")
    }

    return (
        <>
            <MediaCarousel
                items={items}
                title={title}
                subtitle={subtitle}
                onImageClick={handleOpenModal}
            />
            <ModalImage
                modalOpen={modalOpen}
                selectedImage={selectedImage}
                onClose={handleCloseModal}
            />
        </>
    )
}