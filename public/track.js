/* eslint-disable no-undef */
(function () {
  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";

  const scriptParser = document.createElement("script");
  scriptParser.src =
    "https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.20/ua-parser.min.js";

  scriptParser.onload = function () {
    script.onload = function () {
      //const socket = io("https://tuana-server.server.ahmetselimboz.com.tr");
      const socket = io("http://localhost:4000");

      var parser = new UAParser();

      var result = parser.getResult();
      delete result.ua;
      delete result.cpu;

      const getIPAndLocation = async () => {
        try {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const ipData = await ipResponse.json();
          const ip = ipData.ip;

          const locationResponse = await fetch(
            `https://ipinfo.io/json?token=51c3494912e936`
          );
          // const locationResponse = await fetch(
          //   `https://api.ipgeolocation.io/ipgeo?apiKey=b285c859d02c41f1ac3b2d0f601276f9&ip=${ip}`
          // );

          
          const locationData = await locationResponse.json();
          console.log("🚀 ~ getIPAndLocation ~ locationData:", locationData)
          const { country, regionName, countryCode, city, lat, lon } =
            locationData;

          return {
            ip,
            locationInfo: {
              country,
              countryCode,
              regionName,
              city,
              lat,
              lon,
            },
          };
        } catch (error) {
          console.error("IP veya konum alınırken hata oluştu:", error);
          return {
            ip: null,
            locationInfo: {},
          };
        }
      };

      const trackEvent = async (eventType, eventData = {}) => {
        const { locationInfo } = await getIPAndLocation();

        const data = {
          siteId: window.dataLayer[1]["1"],
          type: eventType,
          data: eventData,
          time: new Date().toISOString(),
          url: location.href,
          referrer: document.referrer || "Direct/None",
          userDevice: result,
          location: locationInfo,

          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language || navigator.userLanguage,
        };

        await socket.emit("trackEvent", data);
      };

      document.addEventListener("DOMContentLoaded", () => {
        socket.emit("register");
        trackEvent("page_view", {
          pageTitle: document.title,
        });
      });

      window.addEventListener("beforeunload", async() => {
        trackEvent("beforeunload", { reason: "User leaving the page" });
      });

      document.addEventListener("click", (e) => {
        trackEvent("click", { element: e.target.tagName });
      });
    };
    document.head.appendChild(script);
  };

  document.head.appendChild(scriptParser);
})();
