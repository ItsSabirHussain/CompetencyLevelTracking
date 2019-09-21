import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import boatImage from "./img/jumbotrone.jpg";
import { makeStyles } from "@material-ui/core/styles";

const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: black;
    opacity: 0.2;
    position: absolute;
    top: -1%;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ;
  }
`;

export const Jumbotron = props => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "30px"
          }}
        >
          Personal Competency Tracking
        </h1>
        <p style={{ color: "white", fontWeight: "900" }}>
          We are providing you with the server to add you skill, modify your
          skills, add you profile.
        </p>
      </Container>
    </Jumbo>
  </Styles>
);
