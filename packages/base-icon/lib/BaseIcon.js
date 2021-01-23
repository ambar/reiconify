import React, {forwardRef} from "react";
const ZWSP = "\u200B";
const InlineCenter = ({children, disabled = false}) => disabled ? children : /* @__PURE__ */ React.createElement("span", {
  style: {display: "inline-flex", alignItems: "center"}
}, ZWSP, children);
const BaseIcon = forwardRef(({
  size,
  as: As = "svg",
  text = false,
  center = false,
  fill = "currentColor",
  ...rest
}, ref) => {
  if (text) {
    size = "1.2em";
  }
  return /* @__PURE__ */ React.createElement(InlineCenter, {
    disabled: !center
  }, /* @__PURE__ */ React.createElement(As, {
    ref,
    ...rest,
    ...size && {width: size, height: size},
    fill
  }));
});
export default BaseIcon;
