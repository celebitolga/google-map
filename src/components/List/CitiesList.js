import React, { useState } from "react";
import "./CitiesList.scss";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";


function CitiesList({ citiesNames, handleCityClick }) {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleCityClick(citiesNames[index]);
  };

  return (
    <div className="CitiesList">
      <h3 className="CitiesList-title">Şehir</h3>
      <Divider className="CitiesList-divider" />
      <div className="CitiesList-list" id="scrollStyle">
        <List component="nav" aria-label="secondary mailbox folder">
          {citiesNames.map((city, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={city} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}

export default CitiesList;
