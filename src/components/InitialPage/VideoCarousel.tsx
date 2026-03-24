"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import Image from "next/image";

type Props = {
    items: Video[];
    title: string;
    subtitle: string;
};

export default function MediaCarousel({ items, title, subtitle }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, axis: "x" });
    const [activeName, setActiveName] = useState(items[0]?.name ?? "");

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => {
            const index = emblaApi.selectedScrollSnap();
            setActiveName(items[index]?.name ?? "");
        });
    }, [emblaApi, items]);

    return (
        <section className="w-full">

            {/* Cabeçalho: título + subtitle à esquerda, botões à direita — tudo alinhado */}
            <div className="flex items-end justify-between mb-1">
                <div>
                    <h1 className="text-[2.2rem] leading-tight">{title}</h1>
                    <h3 className="text-sm text-gray-500">{subtitle}</h3>
                </div>
                <div className="flex gap-2 pb-1">
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white text-xl transition"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white text-xl transition"
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Nome da empresa — colado abaixo do cabeçalho, acima do vídeo */}
            <p className="text-sm font-semibold mb-2">{activeName}</p>

            {/* Carrossel — overflow-hidden impede o vídeo de vazar */}
            <div className="overflow-hidden w-full rounded-xl aspect-video" ref={emblaRef}>
                <div className="flex flex-col h-full">
                    {items.map((item) => (
                        <div key={item.id} className="flex-shrink-0 h-full w-full">

                            {item.type === "video" && (
                                <video src={item.src} controls className="w-full h-full object-cover" />
                            )}

                            {item.type === "image" && (
                                <div className="relative w-full h-full">
                                    <Image src={item.src} alt={item.name} fill sizes="100vw" className="object-cover" />
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}