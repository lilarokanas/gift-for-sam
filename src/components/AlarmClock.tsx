import Image from "@atlaskit/image";
import { Box } from "@atlaskit/primitives";
import alarmClock from "../images/alarm-clock.svg";
import { imageStyles } from "./styles";

export const AlarmClock = () => {
  return (
    <Box xcss={imageStyles}>
      <Image src={alarmClock} alt="Graphic showing an alarm clock" />
    </Box>
  );
};
