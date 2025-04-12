import HeroSection from "@/components/public/HeroSection.jsx";
import FeatureSection from "@/components/public/FeatureSection.jsx";
import FeaturesSection from "@/components/public/FeaturesSection.jsx";
import SectionWrapper from "@/config/SectionWrapper.jsx";
import testImage from "@/assets/images/test.webp";

const LandingScreen = () => {
    return (
        <div className="h-feat">
            <HeroSection />
            <SectionWrapper threshold={0.6} displacement="right">
                <FeatureSection 
                    title="Conversión automática" 
                    content="Sube tus archivos Word o de texto y conviértelo en un examen en segundos."
                    image={testImage}/>
            </SectionWrapper>
            <SectionWrapper threshold={0.3} displacement="left">
                <FeatureSection
                    title="Antitrampas"
                    content="Si el estudiante intenta salir de la ventana, el examen se bloqueará."
                    reverse
                    image={testImage}/>
            </SectionWrapper>
            <SectionWrapper threshold={0.5}>
                <FeaturesSection />
            </SectionWrapper>
            </div>
    )
};

export default LandingScreen;