(function () {
  "use strict";

  const LOCATION_API_URL = "https://ipinfo.io/json?token=51c3494912e936";
  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  };

  loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.20/ua-parser.min.js",
    () => {
      loadScript("https://cdn.socket.io/4.7.5/socket.io.min.js", () => {
        const URL = "https://server.tuanalytics.xyz"; // Or production URL
        const socket = io(URL);

        const getOrCreateUserId = () => {
          let userId = localStorage.getItem("userId");
          // console.log("🚀 ~ getOrCreateUserId ~ userId:", userId);
          if (!userId) {
            userId = crypto.randomUUID(); // Yeni bir UUID oluştur
            // Yeni bir UUID oluştur
            localStorage.setItem("userId", userId); // LocalStorage'a kaydet
            localStorage.setItem("session");
            console.log("Yeni kullanıcı: ", userId);
          } else {
      
          }

          let session = sessionStorage.getItem("session");
    

          if (!session) {
            session = crypto.randomUUID(); // Yeni bir UUID oluştur
            sessionStorage.setItem("session", session);
          }

          return { userId, session };
        };

        const documentData = (eventType, locationInfo = [], options = {}) => {
          const data = {
            visitorId: sessionData.userId,
            session: sessionData.session,
            appId: appId || "UnknownApp",
            type: eventType,
            data: options.meta || {},
            time: utcDate,
            url: location.pathname,
            referrer: document.referrer || "Direct/None",
            userDevice: sessionData.deviceInfo,
            location: locationInfo,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || navigator.userLanguage,
        
          };
          return data;
        };

        const parser = new UAParser();
        const deviceInfo = parser.getResult();
        const sessionData = {
          userId: getOrCreateUserId().userId,
          session: getOrCreateUserId().session,
          deviceInfo: deviceInfo,
        };

        let appId = "";
        let utcDate;
        let mouseMovements = [];
        let clicks = [];
        const checkDataLayer = () => {
          if (window?.dataLayer) {
            
            if (window?.dataLayer?.length > 0) {
              window.dataLayer.forEach((element, index) => {
             
                if (element[0] === "config") {
                  appId = element[1];
                }
              });
              console.log("App ID:", appId);
              const getMinimalLocationInfo = async () => {
                try {
                  const response = await fetch(LOCATION_API_URL);
                  if (!response.ok)
                    throw new Error("Location API response error");

                  const locationData = await response.json();

                  return {
                    country: locationData.country || "Unknown Country",
                    city: locationData.city || "Unknown City",
                  };
                } catch (error) {
                  console.error("Error fetching location:", error);
                  return null;
                }
              };

              const ignoreEvent = (reason, options) => {
                if (reason) console.warn("Ignoring Event: " + reason);
                if (options && options.callback) options.callback();
              };

              const trackEvent = async (eventType, options = {}) => {
                //Yerel geliştirme ve bot kontrolleri
                if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(location.hostname) || location.protocol === "file:") {
                  return ignoreEvent("localhost", options);
                }

                if (
                  (window._phantom ||
                    window.__nightmare ||
                    window.navigator.webdriver ||
                    window.Cypress) &&
                  !window.__tu
                ) {
                  return ignoreEvent(null, options);
                }

                try {
                  if (window.localStorage.tu_ignore === "true") {
                    return ignoreEvent("localStorage flag", options);
                  }
                } catch (error) {}

                const locationInfo = await getMinimalLocationInfo();

                const localDate = new Date();
                utcDate = new Date(
                  localDate.getTime() - localDate.getTimezoneOffset() * 60000
                ).toISOString();

                const data = documentData(eventType, locationInfo, options);

                if (locationInfo !== null) {
                  socket.emit("trackEvent", data);
                } else {
                  setTimeout(getMinimalLocationInfo, 100);
                }
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

              const favicon = document.querySelector("link[rel~='icon']");
              if (favicon) {
                console.log(favicon.href); // Favicon URL'si
              } else {
                console.log("Favicon bulunamadı.");
              }

              onDocumentReady(function () {
                console.log("DOM and framework loaded.");
                socket.emit("register", {
                  appId: appId,
                  visitorId: sessionData.userId,
                });
              });

              const previousPath = null;
              const trackPageView = debounce(() => {
                trackEvent("page_view", {
                  meta: { pageTitle: document.title },
                });
              }, 300);

              const handleRouteChange = () => {
                if (previousPath !== location.pathname) {
                  trackPageView();
                }
              };

              const history = window.history;
              if (history.pushState) {
                const originalPushState = history.pushState;
                history.pushState = function () {
                  originalPushState.apply(this, arguments);
                  handleRouteChange();
                };
                window.addEventListener("popstate", handleRouteChange);
              }

              if (document.visibilityState === "prerender") {
                document.addEventListener("visibilitychange", function () {
                  if (document.visibilityState === "visible") {
                    trackPageView();
                  }
                });
              } else {
                trackPageView();
              }

              const localDate22 = new Date();
              const utcDate222 = new Date(
                localDate22.getTime() - localDate22.getTimezoneOffset() * 60000
              ).toISOString();

              let lastURL = location.pathname;

              const observer = new MutationObserver(() => {
                lastURL = location.pathname;
              });

              const targetNode = document.body;
              const config = { childList: true, subtree: true };

              observer.observe(targetNode, config);

              window.addEventListener("beforeunload", (event) => {
                console.log("Sayfa kapanıyor veya sekme kapanıyor.");
                // Burada istediğiniz işlemi yapabilirsiniz.

                const data = JSON.stringify(
                  documentData("User leaving the page")
                );

                fetch(`${URL}/api/apps/track-exit-event`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: data,
                  keepalive: true, // Tarayıcı kapanırken isteği tamamlamaya çalışır
                }).catch((error) =>
                  console.error("Fetch isteği başarısız oldu:", error)
                );
              });

          

              trackMouseMovement();
              function trackMouseMovement() {
                let lastRecordedTime = 0;
                document.addEventListener("mousemove", (e) => {
                  const currentTime = Date.now();
                  if (currentTime - lastRecordedTime > 100) {
       
                    mouseMovements.push({
                      x: e.clientX,
                      y: e.clientY,
                      time: utcDate,
                      screenWidth: window.screen.width,
                      screenHeight: window.screen.height,
                    });
                    lastRecordedTime = currentTime;

                    if (mouseMovements.length == 20) {
                      const trackMouseEvent = {
                        mouseMovement: mouseMovements,
                        appId: appId || "UnknownApp",
                        details: { pageTitle: document.title },
                        time: utcDate,
                        url: lastURL,
                      };

                      console.log(
                        "🚀 ~ document.addEventListener ~ trackMouseEvent:",
                        trackMouseEvent
                      );

                      socket.emit("trackMouseMovement", trackMouseEvent);

                      mouseMovements = [];
                    }
                  }
                });
              }

              trackClicks();
              // Tıklama Noktası İzleme
              function trackClicks() {
                document.addEventListener("click", (e) => {
                  clicks.push({
                    x: e.clientX,
                    y: e.clientY,
                    time: utcDate,
                    screenWidth: window.screen.width,
                    screenHeight: window.screen.height,
                  });
                  const trackClicks = {
                    clicks: clicks,
                    appId: appId || "UnknownApp",
                    details: { pageTitle: document.title },
                    time: utcDate,
                    url: lastURL,
                  };
                  console.log(
                    "🚀 ~ document.addEventListener ~ trackClicks:",
                    trackClicks
                  );
                  socket.emit("trackClicks", trackClicks);
                  clicks = [];
                });
              }

         

              // Kullanıcı Etkileşim Süresi Takibi
              function trackTimeSpent() {
                const startTime = Date.now();
                window.addEventListener("beforeunload", () => {
                  const duration = (Date.now() - startTime) / 1000;
                });
              }
            }
          } else {
   

            setTimeout(checkDataLayer, 100); // 100 ms sonra tekrar kontrol et
          }
        };
        checkDataLayer();
      });
    }
  );

  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }
})();
