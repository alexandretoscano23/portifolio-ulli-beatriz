import { DivLine } from "../DivLine"

export const Contact = () => {
    return (
        <section id="contato">
            <div className="flex items-center justify-around flex-row-reverse">
                <div>
                    <DivLine />
                    <h1 className="text-[2.5rem]">Bora tirar essa ideia do papel?</h1>

                    <p className="max-w-[550px]">
                        Seja para projetos comerciais, cobertura de eventos e produção de conteúdo mensal. Vamos registrar seus momentos da melhor forma e guardá-los com a qualidade e visão que você merece.
                    </p>

                    <div className="flex flex-col gap-[1rem]">
                        <div className="flex items-center gap-[1rem]">
                            <img width="26px" src="/home/gmail.png" alt="" />
                            <a href="mailto:">ullibeatriz.producoes@gmail.com</a>
                        </div>

                        <div className="flex items-center gap-[1rem]">
                            <img width="26px" src="/home/instagram.png" alt="" />
                            <a href="https://www.instagram.com/ullibeatriiz/" target="_blank">ullibeatrizz</a>
                        </div>
                    </div>

                </div>
                <img className="imageShadow rounded-lg" width='380px' src="/home/ulliContato.jpg" alt="ulli contato" />
            </div>
        </section>
    )
} 