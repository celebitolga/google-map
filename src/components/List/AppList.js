import React, {useState, useEffect} from 'react';
import "./AppList.scss";

import CitiesList from "./CitiesList";
import CountiesList from "./CountiesList";
import SearchList from "./SearchList";

function AppList({
  cities,
  appHandleCityClick,
  appHandleCountyClick,
  appHandleSearchClick,
}) {
  const [citiesNames, setCitiesNames] = useState([]);
  const [countiesNames, setCountiesNames] = useState([]);

  const handleCityClick = (cityName) => {
    setCountiesNames(listOfCounties(cityName));
    appHandleCityClick(cityName);
  };

  const handleCountyClick = (countyName) => {
    appHandleCountyClick(countyName);
  };

  const handleSearchListClick = (cityName) => {
    appHandleSearchClick(cityName);
  };

  const listOfCities = () => {
    const list = cities.filter((city) => city.city === city.county);
    const cityNames = [...new Set(list.map((data) => data.city))];

    return cityNames;
  };

  const listOfCounties = (cityName) => {
    const list = cities.filter((city) => city.city === cityName);
    const countiesNames = [
      ...new Set(
        list.map((data) => ({ city: data.city, county: data.county }))
      ),
    ];

    return countiesNames;
  };

  useEffect(() => {
    setCitiesNames(listOfCities());
  }, []);

  return (
    <div className="AppList">
      <div className="AppList-left">
        <CitiesList
          citiesNames={citiesNames}
          handleCityClick={handleCityClick}
        />
        <CountiesList
          countiesNames={countiesNames}
          handleCountyClick={handleCountyClick}
        />
      </div>

      <div className="AppList-right">
        <SearchList
          cities={cities}
          handleSearchListClick={handleSearchListClick}
        />
      </div>
    </div>
  );
}

export default AppList;
