//LABEL COLOR ON BODY CELL'S

export const labelColor = (status, settings) => {
  switch (status) {
    case "selected":
      return settings?.body[0]?.labelSelectedColor
        ? settings?.body[0]?.labelSelectedColor
        : "rgba(0, 0, 0, 0.87)";
    case "normal":
      return settings?.body[0]?.labelColor
        ? settings?.body[0]?.labelColor
        : "rgba(0, 0, 0, 0.87)";
    case "selected-hover":
      return settings?.body[0]?.labelSelectedHoverColor
        ? settings?.body[0]?.labelSelectedHoverColor
        : settings?.body[0]?.labelSelectedColor
        ? settings?.body[0]?.labelSelectedColor
        : "rgba(0, 0, 0, 0.87)";
    case "hover":
      return settings?.body[0]?.labelHoverColor
        ? settings?.body[0]?.labelHoverColor
        : settings?.body[0]?.labelColor
        ? settings?.body[0]?.labelColor
        : "rgba(0, 0, 0, 0.87)";
    default:
      return "white";
  }
};
