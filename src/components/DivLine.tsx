"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const DivLine = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Usamos um seletor interno para garantir que o GSAP ache o alvo
        const element = container.current;

        if (!element) return;

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 95%", // Ativa assim que a linha entra 5% na tela
                toggleActions: "play none none none",
                // markers: true, // Se ainda não aparecer, descomente isso para ver a linha de gatilho
            },
            width: "40px",     // Tamanho final (w-10)
            opacity: 1,
            duration: .8,     // Bem lenta como você pediu
            delay: .8,        // Pequeno respiro antes de começar
            ease: "power2.out",
        });
    }, { scope: container });

    return (
        <div
            ref={container}
            className="mb-1 h-[3px]"
            style={{
                background: 'var(--color3)',
                width: "0px",      // Começa zerada no CSS
                opacity: 0,        // Começa invisível no CSS
                maxWidth: "40px",  // Garante que não estique além do esperado
                display: "block"
            }}
        />
    );
};