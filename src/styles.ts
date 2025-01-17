import { xcss } from "@atlaskit/primitives";

export const backgroundStyles = xcss({
  fontFamily: "Arial, sans-serif",
  margin: "0",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
  paddingBlockStart: "space.400",
});

export const tableStyles = xcss({
  paddingBlock: "space.200",
});

export const gridStyles = xcss({
  gridTemplateColumns: "1fr",
});

export const closeContainerStyles = xcss({
  gridArea: "close",
  gridRowStart: "1",
  gridColumnStart: "1",
});

export const modalStyles = xcss({
  borderRadius: "8px",
});

export const entranceStyles = xcss({
  height: "fit-content",
  width: "fit-content",
  alignSelf: "center",
  paddingBlockStart: "space.200",
});

export const spotlightTargetStyles = xcss({
  width: "fit-content",
  alignSelf: "center",
});

export const pageStyles = xcss({
  paddingBlock: "space.100",
});

export const welcomeTextStyles = xcss({
  width: "fit-content",
  alignSelf: "center",
});

export const scoreWrapperStyles = xcss({
  alignSelf: "center",
  alignItems: "center",
  paddingTop: "space.200",
  lineHeight: "32px",
});

export const scoreStyles = xcss({
  fontWeight: "bold",
  color: "color.text.inverse",
  width: "100px",
  height: "32px",
  alignItems: "center",
  border: "2px solid",
  borderRadius: "4px",
  borderColor: "color.border.discovery",
});

export const gameOverHeaderStyles = xcss({
  justifyContent: "center",
  display: "flex",
});

export const imageContainerStyles = xcss({
  gridArea: "image",
  gridRowStart: "1",
  gridColumnStart: "1",
});

export const centerStyles = xcss({
  alignSelf: "center",
});

export const winPageStyles = xcss({
  height: "75%",
});

export const heartStyles = xcss({
  width: "500px",
  height: "100px",
});
