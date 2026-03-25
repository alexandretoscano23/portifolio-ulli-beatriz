import { Footer } from "@/components/footer";
import { About } from "@/components/InitialPage/About";
import { Contact } from "@/components/InitialPage/Contact";
import { Storymaker } from "@/components/InitialPage/Storymaker";
import Videomaker from "@/components/InitialPage/Videomaker";

export default function Home() {
  return (

    <>
      <main className="flex flex-col px-16 w-full">
        <section className="mt-6">
          <About />
        </section>

        <section className="mt-[4.5rem]">
          <Storymaker />
        </section>

        <section className="mt-[4.5rem]">
          <Videomaker />
        </section>

        <section className="mt-[4.5rem]">
          <Contact />
        </section>
      </main>
    </>
  );
}
