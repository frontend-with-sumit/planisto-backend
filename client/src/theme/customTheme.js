import { purple } from "@material-ui/core/colors";

const customTheme = {
  overrides: {
    MuiAppBar: {
      root: {
        paddingLeft: "1rem",
        paddingRight: "1rem",
      },
      positionFixed: {
        boxShadow: "0 -1px 6px rgba(9, 11, 18, 0.19)",
      },
    },
    MuiIconButton: {
      sizeSmall: {
        padding: "0.5rem",
        fontSize: "1.5rem",
      },
      root: {
        "&:hover": {
          backgroundColor: "None",
        },
      },
      colorSecondary: {
        "&:hover": {
          backgroundColor: "None",
        },
      },
    },
    MuiInput: {
      input: {
        fontFamily: "Open Sans",
        fontSize: "0.9rem",
        letterSpacing: "0.01rem",
      },

      underline: {
        "&:hover:not($disabled):before": {
          borderBottomColor: "rgba(209, 209, 209, 0.7)",
        },
        "&:before": {
          borderBottomColor: "rgba(209, 209, 209, 0.7)",
        },
        "&:after": {
          borderBottomColor: "#7B1FA2",
        },
      },
    },
    MuiTextField: {
      root: {
        fontFamily: "Roboto",
        fontSize: "2rem",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "0.9rem",
        letterSpacing: "1px",
      },
    },
    MuiButton: {
      outlined: {
        borderWidth: "2px",
        borderColor: purple["700"],
        color: purple["700"],
        fontWeight: "bold",

        "&:hover": {
          background: "linear-gradient(45deg, #8e24aa 20%, #4a148c 90%)",
          color: "#ffffff",
        },
      },
      label: {
        fontSize: "0.9rem",
        letterSpacing: "1.5px",
        padding: ".2rem .7rem",
        textTransform: "capitalize",
      },
      textPrimary: {
        color: purple["700"],
      },
    },
    MuiFab: {
      sizeMedium: {
        background: "linear-gradient(45deg, #8e24aa 20%, #4a148c 90%)",
        color: "white",
        fontSize: "1.6rem",
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
      },
    },
    MuiTypography: {
      h3: {
        fontSize: "4.2rem",
        fontWeight: 900,
        color: "#7B1FA2",
      },
      paragraph: {
        fontFamily: "Open Sans",
        fontSize: "0.8rem",
        fontWeight: "600",
        letterSpacing: "1px",
        color: "#9FA5AE",
        marginBottom: "1rem",
      },
      body1: {
        fontSize: "1.3rem",
        fontWeight: "700",
      },
      caption: {
        color: "#7B1FA2",
        fontWeight: 700,
        display: "inline-block",
        letterSpacing: "1px",
      },
      subtitle1: {
        color: "#7B1FA2",
        fontWeight: 400,
        display: "inline-block",
        letterSpacing: "0.8px",
        paddingTop: ".5rem",
      },
    },
    MuiSnackbar: {
      root: { zIndex: 999999 },
    },
    MuiAlert: {
      standardError: {
        fontSize: "0.8rem",
      },
    },
    MuiCheckbox: {
      root: {
        fontSize: "1.5rem",
        color: "#9FA5AE",
        "&$checked": {
          color: "#9FA5AE",
        },
      },
    },
    MuiSelect: {
      icon: {
        fontSize: "1.5rem",
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: "1rem",
        letterSpacing: "1px",
      },
    },
    MuiMenu: {
      list: {
        marginTop: "0",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "1.5rem",
      },
      fontSizeSmall: {
        fontSize: "1rem",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        padding: "1rem",
        backgroundColor: purple["700"],
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "rgba(255, 255, 255, 0.54)",
      },
      toolbarBtnSelected: {
        color: "#fff",
      },
    },
    MuiPickersYear: {
      root: {
        "&:focus": {
          color: purple["500"],
          fontWeight: 600,
        },
      },
      yearSelected: {
        color: purple["700"],
        fontWeight: 600,
      },
    },
    MuiPickersSlideTransition: {
      transitionContainer: {
        "& > p": {
          fontSize: "1rem",
        },
      },
    },
    MuiPickersDay: {
      day: {
        color: purple["800"],
      },
      daySelected: {
        backgroundColor: purple["500"],
        color: "#fff",

        "&:hover": {
          backgroundColor: purple["600"],
        },
      },
      dayDisabled: {
        color: purple["100"],
      },
      current: {
        color: purple["900"],
      },
    },
    MuiPickersTimePickerToolbar: {
      toolbarAmpmLeftPadding: {
        paddingLeft: "1rem",
      },
      ampmSelection: {
        marginLeft: "4px",
        marginRight: "-4px",
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: purple["700"],
      },
    },
    MuiPickersClockPointer: {
      noPoint: {
        backgroundColor: purple["700"],
      },
      pointer: {
        backgroundColor: purple["700"],
      },
      thumb: {
        border: `14px solid ${purple["700"]}`,
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "0.5rem",
        letterSpacing: "1px",
      },
    },
    MuiList: {
      root: {
        marginTop: "1rem",
      },
    },
    MuiListItemText: {
      primary: {
        fontFamily: "Roboto Condensed",
        fontSize: "1rem",
        fontWeight: "600",
        letterSpacing: "1px",
      },
    },
    MuiListItemIcon: {
      root: {
        fontSize: "1.2rem",
        color: "#090B12",
      },
    },
    MuiRating: {
      root: {
        marginBottom: ".5rem",
      },
      label: {
        fontSize: "2.5rem",
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    },
    MuiDialogContentText: {
      root: {
        fontFamily: "Roboto",
        fontSize: "1rem",
        fontWeight: "500",
        letterSpacing: "1px",
      },
    },
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#090B12",
    },
    textPrimary: {
      main: purple["700"],
    },
    textSecondary: {
      color: "#9FA5AE",
    },
  },
  typography: {
    fontFamily: "Roboto",
    htmlFontSize: 5,
    h2: {
      fontSize: "6rem",
    },
    h3: {
      fontSize: "1rem",
    },
    h4: {
      fontSize: "3.5rem",
      color: "#fff",
    },
    h5: {
      fontSize: "2rem",
    },
    h6: {
      fontSize: "2.5rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "500",
      fontFamily: "Roboto Condensed",
      letterSpacing: ".5px",
    },
    body2: {
      fontSize: "1rem",
      letterSpacing: ".5px",
    },
    caption: {
      marginTop: "1rem",
      fontSize: "0.8rem",
    },
    subtitle1: {
      fontSize: "0.8rem",
    },
    legend: {
      fontSize: "0.8rem",
    },
  },
  spacing: 4, // default spacing
};

export default customTheme;
