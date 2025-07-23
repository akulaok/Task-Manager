export const modalBoxStyles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90vw",
    sm: 500,
  },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 6,
  p: 3,
};

export const getTagStyle = (selected: boolean) => ({
  bgcolor: selected ? "#8995dc" : "#efefef",
  color: selected ? "white" : "black",
  cursor: "pointer",
  "&:hover": {
    bgcolor: selected ? "#6e7dd4" : "#efefef",
  },
});
