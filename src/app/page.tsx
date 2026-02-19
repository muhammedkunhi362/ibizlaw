import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import PracticeAreas from "@/components/home/PracticeAreas";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";

export default function Home() {
    return (
        <>
            <Hero />
            <Clients />
            <PracticeAreas />
            <WhyChooseUs />
            <Stats />
        </>
    );
}
