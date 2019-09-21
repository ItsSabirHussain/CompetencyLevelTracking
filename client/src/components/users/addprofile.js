import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Skills from "./multiselect";
import { useTheme } from "@material-ui/core/styles";
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
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        Personal Competency Tracking{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function UpdateProfile(props) {
  const classes2 = useStyles2();
  const theme2 = useTheme();
  const [interestsList, setInterestsList] = React.useState([]);

  function handleChange(event) {
    setInterestsList(event.target.value);
    localStorage.setItem("skills", interestsList);
  }

  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({
    FullName: "",
    Skills: localStorage.getItem("userID"),
    ID: localStorage.getItem("userID"),
    Email: "",
    Phone: "",
    Department: "",
    City: "",
    Country: "",
    CLevel: ""
  });
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
  useEffect(() => {
    if (userInfo.FullName === "") {
      axios
        .post("/getuser", { ID: localStorage.getItem("userID") })
        .then(res => {
          console.log(res.data);
          setUserInfo({
            ...userInfo,
            Email: res.data.Email,
            FullName: res.data.FullName,
            Skills: [],
            Phone: res.data.Phone,
            City: res.data.City,
            Department: res.data.Department,
            Country: res.data.Country,
            CLevel: res.data.CLevel,

            _id: res.data._id
          });
        })
        .catch(error => console.log(error));
    }
  });

  const onClick = e => {
    console.log(userInfo);
    console.log(interestsList);

    axios
      .post("/updateprofile", {
        Skills: interestsList,
        Email: userInfo.Email,
        FullName: userInfo.FullName,
        Phone: userInfo.Phone,
        City: userInfo.City,
        Department: userInfo.Department,
        Country: userInfo.Country,
        CLevel: userInfo.CLevel,
        ID: localStorage.getItem("userID"),
        _id: userInfo._id
      })
      .then(res => {
        props.history.push("/userdashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Your Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label={"Name: " + userInfo.FullName}
                autoFocus
                onChange={e =>
                  setUserInfo({ ...userInfo, FullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={"Email: " + userInfo.Email}
                name="email"
                autoComplete="email"
                onChange={e =>
                  setUserInfo({ ...userInfo, Email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label={"Phone: " + userInfo.Phone}
                name="phone"
                autoComplete="phone"
                onChange={e =>
                  setUserInfo({ ...userInfo, Phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="department"
                label={"Department: " + userInfo.Department}
                name="department"
                autoComplete="department"
                onChange={e =>
                  setUserInfo({ ...userInfo, Department: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label={"City: " + userInfo.City}
                name="role"
                autoComplete="city"
                onChange={e =>
                  setUserInfo({ ...userInfo, City: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Country"
                label={"Country: " + userInfo.Country}
                type="text"
                id="Key"
                autoComplete="country"
                onChange={e =>
                  setUserInfo({ ...userInfo, Country: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
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
                          <Chip
                            key={value}
                            label={value}
                            className={classes2.chip}
                          />
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
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Updates
          </Button>
          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
