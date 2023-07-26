import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const Container = styled(AppBar)`
    background: #ffffff;
    color: #000;
  `;

  const ToolContainer = styled(Toolbar)`
    justify-content: center;

    & > a {
      padding: 20px;
      color: #000;
      text-decoration:none
    }
  `;
  return (
    <Container>
      <ToolContainer>
        <Link to={"/"}>HOME</Link>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/contact"}>CONTACT</Link>
        <Link to={"/login"}>LOGOUT</Link>
      </ToolContainer>
    </Container>
  );
}
