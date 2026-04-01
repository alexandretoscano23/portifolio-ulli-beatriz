export type Video = {
    id: string;
    src: string;
    name: string;
    category: string;
    type: "video" | "image";
    poster?: string;
}