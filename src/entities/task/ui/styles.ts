export const cardSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 4,
  boxShadow: 3,
  transition: "transform 0.2s",
  "&:hover": {transform: "scale(1.01)"},
};

export const descriptionSx = {
  color: "#333",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const actionSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  alignItems: "flex-start",
  p: 2,
};

export const editBtnSx = {
  mt: 1,
  color: "#2b85ca",
  borderColor: "#2b85ca",
  border: "1px solid",
  "&:hover": {
    backgroundColor: "#dfa2db",
    color: "#300d17",
    borderColor: "#dfa2db",
  },
};
