/* eslint-disable no-undef */
(function () {
  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";

  const scriptParser = document.createElement("script");
  scriptParser.src =
    "https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.20/ua-parser.min.js";

  scriptParser.onload = function () {
    script.onload = function () {
      const socket = io("https://server.tuanalytics.xyz");
      //const socket = io("http://localhost:4000");

      var parser = new UAParser();

      var result = parser.getResult();
      delete result.ua;
      delete result.cpu;

      const getIPAndLocation = async () => {
        try {
          const [ipResponse, locationResponse] = await Promise.all([
            fetch("https://api.ipify.org?format=json"),
            fetch(`https://ipinfo.io/json?token=51c3494912e936`),
          ]);

          const ipData = await ipResponse.json();
          const locationData = await locationResponse.json();
          const { country, regionName, countryCode, city, lat, lon } =
            locationData;
          window.localStorage.setItem("ip", ipData.ip);
          return {
            locationInfo: { country, countryCode, regionName, city, lat, lon },
          };
        } catch (error) {
          console.error("IP veya konum alınırken hata oluştu:", error);
          return { ip: null, locationInfo: {} };
        }
      };

      const trackEvent = async (eventType, eventData = {}) => {
        const { locationInfo } = await getIPAndLocation();

        const data = {
          visitorId: null,
          ip: window.localStorage.getItem("ip"),
          appId: window.dataLayer?.[1]?.["1"],
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

        socket.emit("trackEvent", data);
      };

      window.addEventListener("beforeunload", (event) => {
        trackEvent("page_exit", { reason: "User leaving the page" });
        // navigator.sendBeacon(
        //   "http://localhost:4000/trackEvent",
        //   JSON.stringify({
        //     event: "disconnect",
        //     time: new Date().toISOString(),
        //   })
        // );
      });

      const DOMContentLoaded = () => {
        socket.emit("register");
        trackEvent("page_view", {
          pageTitle: document.title,
        });
      };

      document.addEventListener("click", (e) => {
        trackEvent("click", { element: e.target.tagName });
      });

      DOMContentLoaded();
    };
    document.head.appendChild(script);
  };

  document.head.appendChild(scriptParser);
})();
