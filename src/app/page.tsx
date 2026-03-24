import { Footer } from "@/components/footer";
import { About } from "@/components/InitialPage/About";
import { Contact } from "@/components/InitialPage/Contact";
import { Storymaker } from "@/components/InitialPage/Storymaker";
import Videomaker from "@/components/InitialPage/Videomaker";
import Image from "next/image";

export default function Home() {
  return (

    <>
      <main className="flex flex-col px-16 w-full">
        <About />
        <Storymaker />
        <Videomaker />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
