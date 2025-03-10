import styles from "./CityItem.module.css";

import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext.jsx";
import log from "eslint-plugin-react/lib/util/log.js";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date(date));

const CityItem = ({city}) => {
    const {currentCity, deleteCity} = useCities();
    const {cityName, emoji, date, id, position} = city;

    const handleClick = (event) => {
        event.preventDefault();
        deleteCity(id)
    }

    return (
        <li>
            <Link
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    );
};

export default CityItem;