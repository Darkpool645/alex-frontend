import { Link } from "react-router-dom"

const CardWithImage = ({ image, title, description }) => {
    return (
        <div className="w-full border h-fit border-gray-200 rounded-lg shadow-lg">
            <Link to="/" className="rounded-t-lg w-full h-fit hidden md:flex">
                {image ? (
                    <picture className="w-full h-full">
                        <source srcSet={image.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" />
                        <source srcSet={image} type="image/jpeg" />
                        <img src={image} className="w-auto rounded-t-lg pt-0 object-contain" alt={`Imagen representativa a ${title}`} />
                    </picture>
                ) : (
                    <div className="bg-gray-500 size-full rounded-t-lg h-56" />
                )}
            </Link>
            <div className="flex flex-col gap-5 p-8">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 font-normal text-gray-700">{description}</p>
            </div>
        </div>
    )
}

export default CardWithImage