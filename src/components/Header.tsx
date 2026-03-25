'use client'
import { usePathname } from "next/navigation";

export const Header = () => {
    const location = usePathname();
    const isHome = location === '/';
    const navLinks = [
        ...(isHome ? [] : [{ name: 'Home', href: '/' }]), //caso for falso,joga um array vazio. Se for verdadeiro - joga com array com home e o href
        { name: 'Sobre', href: '#sobre' },
        { name: 'Storymaker', href: '#storymaker' },
        { name: 'Videomaker', href: '#videomaker' },
        { name: 'Contato', href: '#contato' }
    ]
    return (
        <>
            <header className="px-16 py-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <h1 className="uppercase text-[2.2rem]">Ulli Beatriz</h1>
                        <span className="uppercase text-[1.2rem] font-light text-[#8B2346] tracking-[4px]">Videomaker & Storymaker</span>
                    </div>

                    <nav>
                        <ul className="flex align-center gap-6">
                            {navLinks.map((item) => (
                                <li key={item.href}><a href={item.href} className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B2346] after:transition-all after:duration-300 hover:after:w-full pb-1">{item.name}</a></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )

}
