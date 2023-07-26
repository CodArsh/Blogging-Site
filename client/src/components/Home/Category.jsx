import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data";

export default function Category() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
  `;
  const StyledButton = styled(Button)`
    width: 85%;
    background: #6495ed;
    margin: 20px;
    color: #fff;
    &:hover {
      color: #6495ed;
    }
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;
  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`}>
        <StyledButton variant="outlined">Create blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((item) => {
            return (
              <TableRow key={item?.id}>
                <TableCell>
                  <StyledLink to={`/?category=${item?.type}`}>
                    {item?.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </>
  );
}
