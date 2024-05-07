import { extendTheme } from "native-base";
import { fonts } from "./fonts";

export const theme = extendTheme({
    fontConfig: {
        ...fonts
    },
    fonts: {
        heading: "Amatica",
        body: "Poppins",
    },
});