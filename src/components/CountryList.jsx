import styles from "./CountryList.module.css";

import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";


const CountryList = () => {
    const {cities, isLoading} = useCities()

    if (isLoading) return <Spinner/>;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map."/>;

    const countries = cities.reduce((arr, city) => {
        const countrySet = new Set(arr.map(el => el.country));
        return countrySet.has(city.country) ? arr : [...arr ,{country: city.country, emoji: city.emoji, id: city.id}];
    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => <CountryItem key={country.id} country={country}/>)}
        </ul>
    );
};

export default CountryList;