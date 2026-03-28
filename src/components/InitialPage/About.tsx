"use client";
import { DivLine } from "../DivLine"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const About = () => {
    return (
        <section id="sobre">
            <div className="flex items-center justify-around container-about">
                <div className="container-text_about">
                    <DivLine />
                    <h1 id="title-about" className="text-[2.5rem]">Sobre Mim</h1>
                    <h3 className="italic destaque subtitle-about" style={{ fontFamily: 'var(--font-citation)' }}>"Entrega rápida é comum. Entrega Rápida e Bem-feita é diferente. " <span className="text-[.8rem]">- ulli beatriz</span></h3>

                    <p id="text-about" className="max-w-[550px] leading-7 mt-[1.2rem]">
                        Meu nome é Ulli Beatriz, tenho 23 anos, sou publicitária formada pela Uniesp e apaixonada por contar histórias que emocionam.

                        Já atuei na Agência Hall7, no setor de mídias da Rede TV Manaíra e atualmente presto serviço para a Produtora Gravo Digital — além de seguir com gestão de perfis para empresas de diferentes nichos.

                        Nos últimos anos minha trajetória tem se voltado com cada vez mais força para produção de roteiros, vídeos e edição criativa — onde descobri meu estilo e propósito profissional.
                    </p>
                </div>
                <img id="image_about" className="imageShadow rounded-lg" width='350px' src="/home/ulliSobre.jpeg" alt="sobre ulli" />
            </div>
        </section>
    )
} 