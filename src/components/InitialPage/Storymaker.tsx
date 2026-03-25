import { DivLine } from "../DivLine";
import { mediaStorymaker } from "@/data/media";
import { SectionModalImage } from "./ModalImage/SectionModalImage";

export const Storymaker = () => {
    return (
        <section id="storymaker" className="overflow-hidden">
            <DivLine />
            <SectionModalImage
                items={mediaStorymaker}
                title="Storymaker"
                subtitle="Veja algumas das minhas produções:"
            />
        </section>
    );
};