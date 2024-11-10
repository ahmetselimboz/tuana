(function () {
  const LOCATION_API_URL = "https://ipinfo.io/json?token=51c3494912e936";

  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  };

  // UAParser and Socket.IO are loaded sequentially for dependency
  loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.20/ua-parser.min.js",
    () => {
      loadScript("https://cdn.socket.io/4.7.5/socket.io.min.js", () => {
        const URL = "http://localhost:4000"; // Or production URL
        //const URL = "https://server.tuanalytics.xyz"
        const socket = io(URL);
        let appId = ""
        const parser = new UAParser();
        const deviceInfo = parser.getResult();
        delete deviceInfo.ua;
        delete deviceInfo.cpu;

        const sessionData = {
          userId: crypto.randomUUID(), // Random, session-based ID
          deviceInfo: deviceInfo,
        };
        console.log(window)
        console.log(window?.dataLayer)
        if (window?.dataLayer && window?.dataLayer?.length > 1) {
          console.log(window.dataLayer)
          appId = window.dataLayer[1][1];
        }

        const getMinimalLocationInfo = async () => {
          try {
            const response = await fetch(LOCATION_API_URL);
            if (!response.ok) throw new Error("Location API response error");

            const locationData = await response.json();
            // Sadece ülke bilgisini alıyoruz
            return { country: locationData.country || "Unknown" };
          } catch (error) {
            console.error("Error fetching location:", error);
            return { country: "Unknown" };
          }
        };

        const trackEvent = async (eventType, eventData = {}) => {
          const locationInfo = await getMinimalLocationInfo();
          const localDate = new Date();
          const utcDate = new Date(
            localDate.getTime() - localDate.getTimezoneOffset() * 60000
          ).toISOString();

          const data = {
            visitorId: sessionData.userId,
            appId: appId || "UnknownApp",
            type: eventType,
            data: eventData,
            time: utcDate,
            url: location.pathname,
            referrer: document.referrer || "Direct/None",
            userDevice: sessionData.deviceInfo,
            location: locationInfo, // Minimal location info (country only)
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || navigator.userLanguage,
          };

          socket.emit("trackEvent", data);
        };

        function onDocumentReady(callback) {
          if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
          ) {
            callback();
          } else {
            document.addEventListener("DOMContentLoaded", callback);
          }
        }
       

        onDocumentReady(() => {
          console.log("DOM and framework loaded.");
          socket.emit("register", {
            appId: appId || "UnknownApp",
            visitorId: sessionData.userId,
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

        window.addEventListener("beforeunload", () => {
          trackEvent("page_exit", { reason: "User leaving the page" });
        });
      });
    }
  );

  // Debounce function to prevent rapid event firing
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }
})();
