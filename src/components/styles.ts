import { xcss } from "@atlaskit/primitives";

// Tile styles
export const tileWrapperStyles = xcss({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
});

export const tileStyles = xcss({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid",
  borderColor: "color.border.inverse",
  borderRadius: "8px",
});

// Hint styles
export const hintWrapperStyles = xcss({
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  marginRight: "space.050",
  justifyContent: "end",
  border: "2px solid",
  borderColor: "color.border.inverse",
  borderRadius: "8px",
});

export const hintStyles = xcss({
  width: "100%",
});

export const upperHintStyles = xcss({
  borderBottom: "2px solid",
  borderColor: "color.border.inverse",
  width: "100%",
});

export const textStyles = xcss({
  paddingInlineEnd: "space.100",
});

export const inlineStyles = xcss({
  alignSelf: "end",
  top: "6px",
  position: "relative",
});

export const imageStyles = xcss({
  width: "30px",
  height: "30px",
});
