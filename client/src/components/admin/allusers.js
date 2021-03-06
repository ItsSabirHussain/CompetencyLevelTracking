import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Personal Competency Tracking</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(0, 0, 0)
  },
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function AllEmployee(props) {
  function allEmpList(props) {
    return props.map(function(cdata, i) {
      return <Data data={cdata} key={i} />;
    });
  }
  const Data = p => (
    <tr>
      <td>{p.data.FullName}</td>
      <td>{p.data.ID}</td>
      <td>{p.data.Department}</td>
      <td>{p.data.City}</td>
      <td>{p.data.Country}</td>
      <td>{p.data.Email}</td>
      <td>{p.data.Phone}</td>
      <td>{p.data.Skills.join(" , ")}</td>
      <td>{p.data.CLevel}</td>
    </tr>
  );

  const [allemp, setAllemp] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (allemp.length < 1) {
      axios
        .post("/getallusers", {})
        .then(res => {
          console.log(res);
          setAllemp(res.data);
        })
        .catch(error => console.log(error));
    }
  });
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <div>
            <h3>List of all employees</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Department</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Skills</th>
                  <th>Competency Level</th>
                </tr>
              </thead>
              <tbody>{allEmpList(allemp)}</tbody>
            </table>
          </div>
        </Grid>
      </Container>
      <Copyright />
    </main>
  );
}
