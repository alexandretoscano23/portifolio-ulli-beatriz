import { DivLine } from "../DivLine";
import MediaCarousel from "@/components/InitialPage/VideoCarousel";
import { mediaStorymaker } from "@/data/media";

export const Storymaker = () => {
    return (
        <section id="storymaker" className="overflow-hidden">
            <DivLine />
            <MediaCarousel
                items={mediaStorymaker}
                title="Storymaker"
                subtitle="Veja algumas das minhas produções:"
            />
        </section>
    );
};