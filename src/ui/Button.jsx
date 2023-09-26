import { Link } from "react-router-dom"

export default function Button({ children, disabled, to, type, onClick }) {
    const className = "bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 uppercase font-semibold text-stone-800 py-3 px-4 transition-colors duration-300 hover:bg-yellow-300 rounded-full tracking-wide inline-block disabled:cursor-not-allowed sm:px-6 sm:py-4";
    const secondry = " bg-stone-500 text-white hover:text-black focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-2 uppercase font-semibold text-stone-800 py-3 px-4 transition-colors duration-300 hover:bg-stone-200 rounded-full tracking-wide inline-block disabled:cursor-not-allowed sm:px-6 sm:py-4";

    if (to) return <Link to={to} className={className}>{children}</Link>
    if (type == "secondry" && onClick) return <button onClick={onClick} className={secondry} disabled={disabled}>{children}</button>
    if (type == "secondry") return <button className={secondry} disabled={disabled}>{children}</button>
    if (onClick) return <button onClick={onClick} className={className} disabled={disabled}>{children}</button>

    return (
        <button className={className} disabled={disabled}>{children}</button>
    )
}