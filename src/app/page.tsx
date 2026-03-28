"use client";

import { useRef } from "react";
import { About } from "@/components/InitialPage/About";
import { Contact } from "@/components/InitialPage/Contact";
import { Storymaker } from "@/components/InitialPage/Storymaker";
import Videomaker from "@/components/InitialPage/Videomaker";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Intro (About)
    gsap.from(".animate-intro", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      onComplete: (self: any) => {
        // Limpa os estilos para não quebrar modais internos no About
        gsap.set(".animate-intro", { clearProps: "all" });
      }
    });

    // 2. Scroll das Seções (Storymaker, Videomaker, Contact)
    const sections = gsap.utils.toArray<HTMLElement>("section").slice(1);

    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        // SOLUÇÃO PARA O MODAL: Remove o transform após a animação
        onComplete: () => {
          gsap.set(section, { clearProps: "all" });
        }
      });
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <main className="flex flex-col px-6 md:px-16 w-full">
        <section className="mt-6">
          <About />
        </section>

        <section className="mt-[4.5rem]">
          <Storymaker />
        </section>

        <section className="mt-[4.5rem]">
          <Videomaker />
        </section>

        <section className="mt-[4.5rem]">
          <Contact />
        </section>
      </main>
    </div>
  );
}