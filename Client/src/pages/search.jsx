import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Search() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    const [results, setResults] = useState(null);

    useEffect(() => {
        async function loadResults() {
            const data = await search(query);
            setResults(data);
        }

        if (query) {
            loadResults();
        }
    }, [query]);

    return (
        <main>
            <h1>Search results for "{query}"</h1>

            {/* results go here */}
        </main>
    );
}