import { DivLine } from "../DivLine"

export const About = () => {
    return (
        <section id="sobre">
            <div className="flex items-center justify-around">
                <div>
                    <DivLine />
                    <h1 className="text-[2.5rem]">Sobre Mim</h1>
                    <h3 className="italic destaque" style={{ fontFamily: 'var(--font-citation)' }}>"Histórias que emocionam, vídeos que conectam."</h3>
                    <p className="max-w-[550px]">
                        Meu nome é Ulli Beatriz, tenho 23 anos, sou publicitária formada pela Uniesp e apaixonada por contar histórias que emocionam.

                        Já atuei na Agência Hall7, no setor de mídias da Rede TV Manaíra e atualmente presto serviço para a Produtora Gravo Digital — além de seguir com gestão de perfis para empresas de diferentes nichos.

                        Nos últimos anos minha trajetória tem se voltado com cada vez mais força para produção de roteiros, vídeos e edição criativa — onde descobri meu estilo e propósito profissional.
                    </p>
                </div>
                <img className="imageShadow rounded-lg" width='360px' src="/home/ulliSobre.jpeg" alt="sobre ulli" />
            </div>
        </section>
    )
} 