import { useState } from "react"
import Image from "next/image";

type Props = {
    modalOpen: boolean
    selectedImage: string
    onClose: () => void
}

export const ModalImage = ({ modalOpen, selectedImage, onClose }: Props) => {
    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
                    <div
                        className="relative w-[80vw] h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image src={selectedImage} alt="Imagem no modal" fill className="object-contain" />
                        <button
                            className="cursor-pointer absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8"
                            onClick={onClose}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}