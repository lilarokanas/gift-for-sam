import ClockIcon from "@atlaskit/icon/core/clock";
import {
  type BackgroundColor,
  Box,
  Inline,
  Stack,
  Text,
} from "@atlaskit/primitives";
import {
  hintStyles,
  hintWrapperStyles,
  inlineStyles,
  textStyles,
  upperHintStyles,
} from "./styles";

interface HintProps {
  index: 0 | 1 | 2 | 3 | 4;
  totalCount: number;
  voltorbCount: number;
}

const backgroundColorMap: Record<number, BackgroundColor> = {
  0: "color.background.accent.red.subtlest",
  1: "color.background.accent.green.subtlest",
  2: "color.background.accent.yellow.subtlest",
  3: "color.background.accent.blue.subtlest",
  4: "color.background.accent.purple.subtlest",
};

const Hint: React.FC<HintProps> = ({ index, totalCount, voltorbCount }) => {
  return (
    <td>
      <Box backgroundColor={backgroundColorMap[index]} xcss={hintWrapperStyles}>
        <Stack xcss={hintStyles}>
          <Box xcss={upperHintStyles}>
            <Box xcss={textStyles}>
              <Text color="color.text.warning.inverse" weight="bold">
                {totalCount}
              </Text>
            </Box>
          </Box>
          <Inline space="space.100" xcss={inlineStyles}>
            <ClockIcon label="clock" />
            <Box xcss={textStyles}>
              <Text color="color.text.warning.inverse" weight="bold">
                {voltorbCount}
              </Text>
            </Box>
          </Inline>
        </Stack>
      </Box>
    </td>
  );
};

export default Hint;
