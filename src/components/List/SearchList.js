import React, {useState} from 'react';
import "./SearchList.scss";

import { Button } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import PlaceIcon from "@material-ui/icons/Place";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function SearchList({ cities, handleSearchListClick }) {
  const [inputValue, setInputValue] = useState("");
  const [searhedCities, setSearhedCities] = useState([]);
  const [error, setError] = useState(false);

  const buttonClickHandler = () => {
    searhPlaces();
  };

  const inputKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      // console.log(event.target.value);
      searhPlaces();
    }
  };

  const inputOnChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const handlerCityClickButton = (city) => {
    handleSearchListClick(city.city);
  };

  const searhPlaces = () => {
    const array = inputValue.split("-");
    if (array.length !== 2) {
      setError(true);
    } else if (isNaN(array[0]) || isNaN(array[1])) {
      setError(true);
    } else {
      setError(false);
      const data = cities
        .filter((city) => city.city === city.county)
        .map((city) => ({
          city: city.city,
          centerLat: city.centerLat,
          centerLon: city.centerLon,
        }));
      const arrayDistances = [];

      data.forEach((element) => {
        arrayDistances.push({
          city: element.city,
          distance: getDistanceFromLatLonInKm(
            array[0],
            array[1],
            element.centerLat,
            element.centerLon
          ).toFixed(2),
        });
      });

      arrayDistances.sort(function (a, b) {
        return a.distance - b.distance;
      });

      const forSearchedArray = [];
      for (let i = 0; i < 3; i++) {
        forSearchedArray.push(arrayDistances[i]);
      }
      setSearhedCities(forSearchedArray);
    }
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div className="SearchList">
      <div className="SearchList-input">
        <input
          type="text"
          placeholder="Konum (Enlem-Boylam)"
          onKeyPress={inputKeyPressHandler}
          onChange={inputOnChangeHandler}
        />
        <Button
          className="SearchList-input-button"
          variant="contained"
          color="primary"
          endIcon={<SearchIcon />}
          onClick={buttonClickHandler}
        >
          En yakın yerleşim yeri bul
        </Button>
      </div>

      {error && <div className="SearchList-error">Hatalı Arama</div>}

      <TableContainer
        className={`SearchList-table ${
          searhedCities.length === 0 && "tablePassive"
        } ${error && "tablePassive"}`}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Şehir</TableCell>
              <TableCell align="right">Mesafe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searhedCities.map((city, index) => (
              <TableRow key={"city-" + index}>
                <TableCell
                  className="SearchList-table-cityName"
                  component="th"
                  scope="row"
                >
                  <Button
                    className="SearchList-table-cityName-button"
                    variant="contained"
                    color="primary"
                    endIcon={<PlaceIcon />}
                    onClick={() => {
                      handlerCityClickButton(city);
                    }}
                  >
                    {city.city}
                  </Button>
                </TableCell>
                <TableCell align="right">{city.distance} km</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SearchList;
