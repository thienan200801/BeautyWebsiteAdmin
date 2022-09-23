/* eslint-disable no-undef */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      blue: colors.blue,
      grey: "#7F7F7F",
      primary: "#1890ff",
    },
    extend: {
      colors: {
        "grey-dark": "#434343",
      },
      width: {
        "6xl": 1152,
      },
      gridTemplateColumns: {
        sidebar: "auto 320px",
        login: "7fr 8fr",
        autowidth: "auto auto",
        "3/1": " minmax(0, 4fr) 1fr",
      },
      gridTemplateRows: {
        sidebar: "65px 1fr",
      },
      spacing: {
        500: "500px",
        60: "60px",
        750: "750px",
        650: "650px",
        "40vh": "40vh",
        "20vw": "20vw",
        "40vw": "40vw",
        "75vh": "75vh",
      },
      fontFamily: {
        sourceSanPro: ['"Source Sans Pro"'],
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover", "group-focus"],
      display: ["group-hover", "group-focus"],
      backgroundColor: ["group-focus"],
      overflow: ["group-hover"],
      borderWidth: ["focus"],
      width: ["focus"],
      transitionProperty: ["focus"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
