import React, { useState } from "react";
import "./CountiesList.scss";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

function CountiesList({ countiesNames, handleCountyClick }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleCountyClick(countiesNames[index]);
  };

  return (
    <div
      className={`${
        countiesNames.length === 0 ? "CountiesListPassive" : "CountiesList"
      }`}
    >
      <h3 className="CountiesList-title">İlçe</h3>
      <Divider className="CountiesList-divider" />
      <div className="CountiesList-list" id="scrollStyle">
        <List component="nav" aria-label="secondary mailbox folder">
          {countiesNames.map((city, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={city.county} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}

export default CountiesList;
