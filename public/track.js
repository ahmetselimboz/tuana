(function () {
  const IP_API_URL = "https://api.ipify.org?format=json";
  const LOCATION_API_URL = "https://ipinfo.io/json?token=51c3494912e936";

  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  };

  // UAParser and Socket.IO are loaded sequentially for dependency
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.20/ua-parser.min.js", () => {
    loadScript("https://cdn.socket.io/4.7.5/socket.io.min.js", () => {
      //const URL = "https://server.tuanalytics.xyz"
      const URL = "http://localhost:4000"


      const socket = io(URL);

      const parser = new UAParser();
      const deviceInfo = parser.getResult();
      delete deviceInfo.ua;
      delete deviceInfo.cpu;

      function checkDataLayer() {
        if (window.dataLayer && window.dataLayer.length > 1) {
          const appId = window.dataLayer[1][1];
          let userId = localStorage.getItem("userId");

          if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("userId", userId);
          }

          const getIPAndLocation = async () => {
            try {
              const [ipResponse, locationResponse] = await Promise.all([
                fetch(IP_API_URL),
                fetch(LOCATION_API_URL),
              ]);

              if (!ipResponse.ok || !locationResponse.ok) throw new Error("API response error");

              const ipData = await ipResponse.json();
              const locationData = await locationResponse.json();

              const { country, city, region, loc } = locationData;
              const [lat, lon] = loc ? loc.split(",") : [null, null];

              window.localStorage.setItem("ip", ipData.ip);

              return {
                locationInfo: {
                  country,
                  region,
                  city,
                  lat,
                  lon,
                },
              };
            } catch (error) {
              console.error("Error fetching IP or location:", error);
              return { ip: null, locationInfo: {} };
            }
          };

          const trackEvent = async (eventType, eventData = {}) => {
            const { locationInfo } = await getIPAndLocation();
            const localDate = new Date();
            const utcDate = new Date(
              localDate.getTime() - localDate.getTimezoneOffset() * 60000
            ).toISOString();

            const data = {
              visitorId: userId,
              ip: window.localStorage.getItem("ip"),
              appId: appId,
              type: eventType,
              data: eventData,
              time: utcDate,
              url: location.pathname,
              referrer: document.referrer || "Direct/None",
              userDevice: deviceInfo,
              location: locationInfo,
              screenResolution: `${window.screen.width}x${window.screen.height}`,
              language: navigator.language || navigator.userLanguage,
            };

            socket.emit("trackEvent", data);
          };

          window.addEventListener("beforeunload", (event) => {
            trackEvent("page_exit", { reason: "User leaving the page" });
            socket.emit("disconnect", appId);
          });

          function onDocumentReady(callback) {
            if (document.readyState === "complete" || document.readyState === "interactive") {
              callback();
            } else {
              document.addEventListener("DOMContentLoaded", callback);
            }
          }

          onDocumentReady(function () {
            console.log("DOM and framework loaded.");
            socket.emit("register", {
              appId: appId,
              visitorId: userId,
            });
          });

          const trackPageView = debounce(() => {
            trackEvent("page_view", {
              pageTitle: document.title,
            });
          }, 300);

          trackPageView();
          window.addEventListener("popstate", trackPageView);

          const originalPushState = history.pushState;
          history.pushState = function () {
            originalPushState.apply(this, arguments);
            trackPageView();
          };
        } else {
          setTimeout(checkDataLayer, 100);
        }
      }

      checkDataLayer();
    });
  });

  // Debounce function to prevent rapid event firing
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }
})();
