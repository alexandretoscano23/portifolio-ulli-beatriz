import MediaCarousel from "@/components/InitialPage/VideoCarousel";
import { mediaVideomaker } from "@/data/media";

export default function Videomaker() {
    return (
        <div id="videomaker">
            <MediaCarousel items={mediaVideomaker} title="Videomaker" subtitle="aaaa" />;
        </div>
    )
}