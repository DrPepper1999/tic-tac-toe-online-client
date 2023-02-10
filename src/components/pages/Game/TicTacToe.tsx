import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks/hooks";
import { Mark } from "./Mark/Mark";
import { styled } from "@mui/material/styles";

export const TicTacToe = () => {

  const mapSize = useAppSelector(state => state.game.map.size);

  const Layout = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplate: `repeat(${mapSize}, 100px)/repeat(${mapSize}, 100px)`,
    justifyContent: "center",
    gap:16
  }));

  const dispatch = useAppDispatch();

  const mapFields = useAppSelector((state) => state.game.map.fields);
  return (
    <Layout>
      {mapFields.map((fields, x) =>
        fields.map((field, y) => (
          <Mark
            key={x.toString() + y}
            mark={field}
            x = {x}
            y = {y}
          />
        ))
      )}
    </Layout>
  );
};
