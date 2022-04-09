document.addEventListener("DOMContentLoaded", () => {
  let language = window.navigator
    ? window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage
    : "en";
  //   language = language.substr(0, 2).toLowerCase();

  var thLangs = {
    "en-GB": {
      url: "/uk/",
    },

    "en-GB-oxendict": {
      url: "/uk/",
    },

    "de-DE": {
      url: "/de/",
    },

    de: {
      url: "/de/",
    },

    ja: {
      url: "/jp/",
    },
    zh: {
      url: "/cn/",
    },

    cn: {
      url: "/cn/",
    },

    "zh-CN": {
      url: "/cn/",
    },

    "zh-CHS": {
      url: "/cn/",
    },

    "zh-Hans": {
      url: "/cn/",
    },

    "zh-SG": {
      url: "/cn/",
    },

    "zh-CHT": {
      url: "/cn/",
    },

    "zh-Hant": {
      url: "/cn/",
    },

    "zh-HK": {
      url: "/cn/",
    },

    "zh-MO": {
      url: "/cn/",
    },

    "zh-TW": {
      url: "/cn/",
    },
  };

  let firstTime = localStorage.getItem("first_time");

  function redirectLocation(key) {
    if (!firstTime) {
      // first time loaded!
      localStorage.setItem("first_time", "1");
      //redirect
      location.href = thLangs[key]["url"];
    }
  }

  Object.keys(thLangs).forEach((key) => {
    if (language === key && !location.pathname.includes(thLangs[key]["url"])) {
      redirectLocation(key);
    }
  });
});
