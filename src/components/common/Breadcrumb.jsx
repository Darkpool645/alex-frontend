import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
    return(
        <nav className="hidden md:flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <svg className="size-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7.05 4.05a.5.5 0 01.7 0L13 9.29a1 1 0 010 1.41l-5.25 5.25a.5.5 0 01-.7-.7l4.95-4.95-4.95-4.95a.5.5 0 010-.7z" />
                        </svg>
                        )}
                        <Link to={item.href} className="inline-flex gap-3 items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                            {item.icon && <item.icon className="size-5" />}
                            <span>{item.label}</span>
                        </Link>
                        
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;