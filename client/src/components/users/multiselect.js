import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles2 = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400
    }
  }
};

const names = [
  "Communication",
  "IT/Technology Affinity",
  "Big Data",
  "Problem Solving",
  "Life-Long Learning",
  "Work in Interdisciplinary Environments",
  "Network Technology",
  "Modelling/Programming",
  "Data/Network Security",
  "Business Process Mgm",
  "Collaboration",
  "Reamwork",
  "Decision Making",
  "Leardership Skills",
  "Service Orientation",
  "Creativity",
  "Self-Management"
];

function getStyles2(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function Skills() {
  const classes2 = useStyles2();
  const theme2 = useTheme();
  const [interestsList, setInterestsList] = React.useState([]);

  function handleChange(event) {
    setInterestsList(event.target.value);
    localStorage.setItem("skills", interestsList);
  }

  return (
    <div className={classes2.root}>
      <FormControl className={classes2.formControl}>
        <InputLabel htmlFor="select-multiple-chip">
          Select your Skills{" "}
        </InputLabel>
        <br></br>
        <br></br>
        <Select
          multiple
          value={interestsList}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes2.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes2.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles2(name, interestsList, theme2)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
