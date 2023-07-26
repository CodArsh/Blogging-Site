import React from "react";
import { Box, styled, Typography } from "@mui/material";
const Image = styled(Box)`

  background: url(https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)
    center/55% repeat-x #000;
  height: 50vh;
  width: "100%";
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > p {
    line-height: 1.5;
  }
`;
const TopHead = styled(Typography)`
  color: #fff;
  font-size: 70px;
  text-decoration:underline
`;

const SubHead = styled(Typography)`
  color: #fff;
  font-size: 30px;
  display:flex;
  flex-direction:row
`;
const Product = styled(Typography)`
  color: #E36405;
  font-size: 30px;
`;
export default function Banner() {
  return (
    <Image>
      <TopHead>BlogiN</TopHead>
      <SubHead>
        Arsil Malek's <Product> &nbsp;Production</Product>
      </SubHead>
    </Image>
  );
}
