import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {

    const [query, setQuery] = useState();
    const navigate = useNavigate();

    function handelSubmit(e) {
        e.preventDefault(); 
        if(!query)return ;
        navigate(`/order/${query}`)
        setQuery("");
    }

    return (
        <form onSubmit={handelSubmit}>
            <input className="rounded-full px-4 bg-yellow-100 py-2 text-sm placeholder:text-stone-400 sm:w-64 transition-all duration-300 focus:outline-none sm:focus:w-72 w-28" placeholder="Search Order #" value={query} onChange={e => setQuery(e.target.value)}></input>
        </form>
    )
}


export default SearchOrder;