const colours = {
  white: "#ffffff",
  offWhite: "#F5F5F5",
  accent: "teal",
};

const gradients = {
  default: `linear(to-r, ${colours.accent}.400, ${colours.accent}.200)`,
  pretty: `linear(to-r, pink.300, ${colours.accent}.400,)`,
};

const theme = { colours, gradients };

export default theme;
