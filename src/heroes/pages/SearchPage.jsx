import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import queryString from "query-string";
import { getHeroesByName } from "../helpers";
import { HeroCard } from "../components";

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);
    const heroes = getHeroesByName(q);

    const { searchText, onInputChange } = useForm({
        searchText: q,
    });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText.toLowerCase().trim()}`);
    };
    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit} aria-label="form">
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={searchText}
                            onChange={onInputChange}
                        />

                        <button
                            className="btn mt-1 btn-outline-primary"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {q === "" ? (
                        <div className="alert alert-info">Search a hero</div>
                    ) : (
                        heroes.length === 0 && (
                            <div className="alert alert-danger">
                                No hero with <b>{q}</b>
                            </div>
                        )
                    )}

                    {heroes.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </>
    );
};
