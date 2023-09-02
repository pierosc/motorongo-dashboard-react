export const labelText = {
  fontFamily: "'Roboto','Helvetica','Arial','sans-serif'",
  fontSize: "0.875rem",
  fontWeight: "500",
  lineHeight: "1rem",
  letterSpacing: "0.0em",
  color: " rgb(17 24 39)",
  marginBottom: "0.5rem",

  display: "block",
};

const DropButton = {
  fontSize: "16px",
  cursor: "pointer",
};

export const dropdownContainer = {
  backgroundColor: "white",
  // minWidth: "100%",
  overflow: "auto",
  border: " 1px solid #ddd",
  zIndex: "2000",
  maxHeight: "225px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  borderRadius: "0.375rem",
  position: "fixed",
  "&:hover": { backgroundColor: "rgba(30, 144, 255, 1" },
  // left: "0",
  // top: "0",
  // transform: "translate(-50%, -50%)",
};

const label = "block mb-2 label_text text-gray-900 light:text-white";

export const selectStyle = {
  labelText: labelText,
  DropButton: DropButton,
  dropdownContainer: dropdownContainer,
};
