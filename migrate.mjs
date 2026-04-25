import { neon } from "@neondatabase/serverless";
import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";

const DATABASE_URL = "postgresql://neondb_owner:npg_JLlQCgcKiE29@ep-crimson-term-amfnfgb8.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require";
const CLOUD_NAME = "dpwysesrd";
const API_KEY = "619227419355193";
const API_SECRET = "M-4c_dJSb7rgnGjf8mkUAhDMt7Q";

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET });

const sql = neon(DATABASE_URL);

const records = [
    { name: "Lidiane Arquitetura", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774798814328.mov", category: "videomaker", type: "video" },
    { name: "Luara & Eduardo", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774798358261.mov", category: "videomaker", type: "video" },
    { name: "Noivado L&E", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/storymaker/1774795527691.mov", category: "storymaker", type: "video" },
    { name: "Gravo Digital", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774795168271.mp4", category: "videomaker", type: "video" },
    { name: "Gilvan Cabeleireiros", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774794678702.mp4", category: "videomaker", type: "video" },
    { name: "Rosana Santos", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774794625652.mp4", category: "videomaker", type: "video" },
    { name: "Nina Melo", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774793807774.mp4", category: "videomaker", type: "video" },
    { name: "Mamoplastia Adriana", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774793717090.mp4", category: "videomaker", type: "video" },
    { name: "Adventistas Nordeste", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/videomaker/1774793579426.mp4", category: "videomaker", type: "video" },
    { name: "Gravo Digital", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/storymaker/1774793530540.mp4", category: "storymaker", type: "video" },
    { name: "15 anos Bel", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/storymaker/1774793455217.mov", category: "storymaker", type: "video" },
    { name: "Gravo Digital", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/storymaker/1774793285905.mov", category: "storymaker", type: "video" },
    { name: "Gravo Digital", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/storymaker/1774793217319.mov", category: "storymaker", type: "video" },
    { name: "Gravo Digital", src: "https://bzgvskzsmbcgzpycfjux.supabase.co/storage/v1/object/public/media/storymaker/1774793088086.mov", category: "storymaker", type: "video" },
];

const migrate = async () => {
    console.log(`\n🚀 Iniciando migração de ${records.length} arquivos...\n`);
    for (const record of records) {
        console.log(`📤 Enviando: ${record.name} (${record.category})`);
        try {
            const check = await fetch(record.src, { method: "HEAD" });
            if (!check.ok) { console.warn(`  ⚠️  URL inacessível (${check.status}), pulando...`); continue; }
            const result = await cloudinary.uploader.upload(record.src, { resource_type: "video", folder: `ulli/${record.category}` });
            const newSrc = result.secure_url;
            const poster = newSrc.replace("/video/upload/", "/video/upload/so_1,f_jpg/").replace(/\.[^/.]+$/, ".jpg");
            await sql`INSERT INTO videos (src, name, category, type, poster) VALUES (${newSrc}, ${record.name}, ${record.category}, ${record.type}, ${poster})`;
            console.log(`  ✅ Migrado: ${newSrc}`);
        } catch (err) {
            console.error(`  ❌ Erro: ${err.message}`);
        }
    }
    console.log("\n✅ Migração concluída!");
};

migrate();
