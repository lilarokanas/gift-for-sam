import ClockIcon from "@atlaskit/icon/core/clock";
import { Box, Text } from "@atlaskit/primitives";
import React from "react";
import { Tile as TileType } from "../utils/gameLogic";
import { tileStyles, tileWrapperStyles } from "./styles";

interface TileProps {
  tile: TileType;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ tile, onClick }) => {
  return (
    <td className={`tile ${tile.flipped ? "flipped" : ""}`} onClick={onClick}>
      <Box xcss={tileWrapperStyles}>
        <Box
          xcss={tileStyles}
          backgroundColor={
            tile.flipped
              ? "color.background.accent.magenta.subtle"
              : "color.background.accent.magenta.bolder"
          }
        >
          <Text color="color.text.warning.inverse" size="large" weight="bold">
            {tile.flipped ? (
              tile.type === "voltorb" ? (
                <ClockIcon label="clock" />
              ) : (
                tile.value
              )
            ) : (
              ""
            )}
          </Text>
        </Box>
      </Box>
    </td>
  );
};

export default Tile;
