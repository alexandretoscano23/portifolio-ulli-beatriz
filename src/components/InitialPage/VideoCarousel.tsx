"use client"; //mostrar que o código roda do lado do cliente e não
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { Video } from "@/types/video";
import Image from "next/image";

type Props = {
    items: Video[];
    title: string;
    subtitle: string;
};

export default function MediaCarousel({ items, title, subtitle }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
    const [activeIndex, setActiveIndex] = useState(0);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

    const updateOpacity = useCallback(() => {
        if (!emblaApi) return;
        const selected = emblaApi.selectedScrollSnap();
        slidesRef.current.forEach((slide, index) => {
            if (!slide) return;
            slide.style.opacity = index === selected ? "1" : "0.3";
        });
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        updateOpacity();
        emblaApi.on("scroll", updateOpacity);
        emblaApi.on("select", () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
            updateOpacity();
        });
    }, [emblaApi, updateOpacity]);

    return (
        <section className="w-full">

            {/* Cabeçalho */}
            <div className="flex items-end justify-between mb-1">
                <div>
                    <h1 className="text-[2.2rem] leading-tight">{title}</h1>
                    <h3 className="text-sm text-gray-500">{subtitle}</h3>
                </div>
            </div>

            {/* Nome da empresa ativo */}
            <p className="text-sm font-semibold mb-3">{items[activeIndex]?.name}</p>

            {/* Carrossel */}
            <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex gap-4">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            ref={(el) => { slidesRef.current[index] = el; }}
                            className="flex-shrink-0 w-[58%] aspect-video rounded-lg overflow-hidden transition-opacity duration-200"
                            style={{ opacity: index === activeIndex ? 1 : 0.3 }}
                        >
                            {item.type === "video" && (
                                <video src={item.src} controls className="w-full h-full object-cover" />
                            )}
                            {item.type === "image" && (
                                <div className="relative w-full h-full">
                                    <Image src={item.src} alt={item.name} fill sizes="70vw" className="object-cover" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botões abaixo */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => emblaApi?.scrollPrev()}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-xl transition"
                >
                    ‹
                </button>
                <button
                    onClick={() => emblaApi?.scrollNext()}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-xl transition"
                >
                    ›
                </button>
            </div>

        </section>
    );
}