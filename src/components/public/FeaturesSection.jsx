import CardWithImage from "./CardWithImage";
import SectionWrapper from "@/config/SectionWrapper.jsx";
import test from "@/assets/images/test.webp";

const FeaturesSection = () => {
    return (
        <div className="flex flex-col items-center justify-center h-f pb-10 gap-y-14">
            <h1 className="text-5xl font-bold text-center">Más funciones</h1>
            <div className="grid justify-center grid-cols-1 w-full md:grid-cols-3 gap-5 px-4 lg:px-24">
                <SectionWrapper threshold={0.3} displacement="vertical">
                    <CardWithImage title="titulo prueba" description="descripcion de prueba" image={test} />
                </SectionWrapper>
                
                <SectionWrapper threshold={0.2} displacement="vertical">
                    <CardWithImage title="titulo prueba" description="descripcion de prueba" image={test} />
                </SectionWrapper>
                
                <SectionWrapper threshold={0.4} displacement="vertical">
                    <CardWithImage title="titulo prueba" description="descripcion de prueba" image={test} />
                </SectionWrapper>
            </div>
        </div>
    );
};

export default FeaturesSection;
