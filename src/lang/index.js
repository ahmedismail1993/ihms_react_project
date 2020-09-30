import i18n from "i18next";
import ar from "./ar.js";
import en from "./en.js";
import { initReactI18next } from "react-i18next";
import cookie from "js-cookie";

if (!cookie.get("locale")) {
  cookie.set("locale", "ar");
}
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...en,
      },
    },
    ar: {
      translation: {
        ...ar,
      },
    },
  },
  lng: cookie.get("locale") || "ar",
  fallbackLng: "ar",

  interpolation: {
    escapeValue: false,
  },
});
