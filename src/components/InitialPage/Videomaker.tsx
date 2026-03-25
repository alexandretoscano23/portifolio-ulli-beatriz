
import { mediaVideomaker } from "@/data/media";
import { DivLine } from "../DivLine";
import { SectionModalImage } from "./ModalImage/SectionModalImage";

export default function Videomaker() {
    return (
        <div id="videomaker">
            <DivLine />
            <SectionModalImage items={mediaVideomaker} title="Videomaker" subtitle="Veja algumas das minhas produções:" />
        </div>
    )
}