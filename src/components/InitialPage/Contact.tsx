import { DivLine } from "../DivLine"

export const Contact = () => {
    return (
        <section id="contato">
            <div className="flex items-center justify-around flex-row-reverse container-contact">
                <div>
                    <DivLine />
                    <h1 className="text-[2.5rem] title-contact">Bora tirar essa ideia do papel?</h1>

                    <p className="max-w-[550px] leading-7 mt-[1rem]">
                        Seja para projetos comerciais, cobertura de eventos e produção de conteúdo mensal. Vamos registrar seus momentos da melhor forma e guardá-los com a qualidade e visão que você merece.
                    </p>

                    <div id="container-icons" className="flex flex-col gap-[1rem] mt-[2rem]">
                        <div className="flex items-center gap-[1rem]">
                            <img id="gmail-icon" width="26px" src="/home/gmail.png" alt="gmail" />
                            <a href="mailto:">ullibeatriz.producoes@gmail.com</a>
                        </div>

                        <div className="flex items-center gap-[1rem]">
                            <img id="insta-icon" width="26px" src="/home/instagram.png" alt="instagram  " />
                            <a href="https://www.instagram.com/ullibeatriiz/" target="_blank">ullibeatrizz</a>
                        </div>
                    </div>

                </div>
                <img id="image_contact" className="imageShadow rounded-lg " width='380px' src="/home/ulliContato.jpg" alt="ulli contato" />
            </div>
        </section>
    )
} 