'use client'
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Header = () => {

    const [isMenuClick, setIsMenuClick] = useState(false);
    const menuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!menuRef) return

        if (isMenuClick) {
            gsap.fromTo(menuRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            )
        }
    }, [isMenuClick])

    const handleClick = () => {
        setIsMenuClick(!isMenuClick); //se clicar vira true e ao clicar de novo vira false (alterna)
    }

    const location = usePathname();
    const isHome = location === '/';
    const navLinks = [
        ...(isHome ? [] : [{ name: 'Home', href: '/' }]),
        { name: 'Sobre', href: '#sobre' },
        { name: 'Storymaker', href: '#storymaker' },
        { name: 'Videomaker', href: '#videomaker' },
        { name: 'Contato', href: '#contato' }
    ]
    return (
        <>
            <header className="px-6 md:px-16 mt-[1rem] px-4 py-6 mb-[.8rem] mt-[.6rem]" style={{ background: "var(--color1)" }}>
                {/* Linha 1: título + botão */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
                        <h1 className="uppercase text-[2.2rem] title_header">Ulli Beatriz</h1>
                        <span className="uppercase text-[1.2rem] font-light text-[#8B2346] tracking-[4px] subtitle_header">Videomaker & Storymaker</span>
                    </div>

                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((item) => (
                                <li key={item.href}><a href={item.href}>{item.name}</a></li>
                            ))}
                        </ul>
                    </nav>

                    <button className="md:hidden bg-[var(--color3)] text-[1.5rem] px-4 py-2" style={{ background: "var(--color1)", borderRadius: "50%" }} onClick={handleClick}>
                        {isMenuClick ? "X" : "☰"}

                    </button>
                </div>

                {/* Linha 2: menu mobile */}
                {isMenuClick && (
                    <nav
                        ref={menuRef}
                        className={`md:hidden mt-4 ${isMenuClick ? "block" : "hidden"}`}
                    >
                        <ul className="flex flex-col gap-3 px-4 py-2" style={{ background: "#B0365E", borderRadius: "16px" }}>
                            {navLinks.map((item) => (
                                <li key={item.href}>
                                    <a style={{ color: "var(--color1)" }} href={item.href}>{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </header>
        </>
    )

}
