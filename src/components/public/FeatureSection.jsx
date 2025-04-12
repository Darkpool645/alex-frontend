const FeatureSection = ({title, content, image, reverse}) => {
    return (
        <div className="h-feat pb-14">
            <div className={`flex justify-between gap-20 px-4 lg:px-24 items-center ${reverse ? 'flex-row-reverse' : ''}`}>
                { image ? (
                    <picture className="rounded-lg w-full h-96 hidden md:flex">
                        <source srcSet={image.replace(/\.(jpg|png)$/, '.webp')} type="image/webp"/>
                        <source srcSet={image} type="image/jpeg"/>
                        <img src={image} className="w-full h-96 object-contain" alt={`Imagen representativa a ${title}`}/>
                    </picture>
                ):(
                    <div className="bg-gray-500 rounded-lg w-full h-96 hidden md:flex"/>
                )}
                <div className="w-full flex flex-col gap-y-5">
                    <h1 className="text-5xl font-bold text-center">{title}</h1>
                    <span className="font-medium text-gray-400 text-2xl text-center">{content}</span>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;