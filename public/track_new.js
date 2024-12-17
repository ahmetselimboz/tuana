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
        const URL = "http://localhost:4000"; // Or production URL
        const socket = io(URL);

        const getOrCreateUserId = () => {
          let userId = localStorage.getItem("userId");
          console.log("🚀 ~ getOrCreateUserId ~ userId:", userId);
          if (!userId) {
            userId = crypto.randomUUID(); // Yeni bir UUID oluştur
            // Yeni bir UUID oluştur
            localStorage.setItem("userId", userId); // LocalStorage'a kaydet
            localStorage.setItem("session");
            console.log("Yeni kullanıcı: ", userId);
          } else {
            console.log("Geri dönen kullanıcı: ", userId);
          }

          let session = sessionStorage.getItem("session");
          console.log("🚀 ~ getOrCreateUserId ~ userId:", userId);

          if (!session) {
            session = crypto.randomUUID(); // Yeni bir UUID oluştur
            sessionStorage.setItem("session", session);
          }

          return { userId, session };
        };

        const documentData = (eventType, locationInfo = [], options = {})=>{
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
            location: locationInfo ,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || navigator.userLanguage,
            // mouseMovement: trackMouseMovement(),
            // clickCoordinates: trackClicks(),
            // timeSpent: trackTimeSpent(),
          };
          return data
        }

        const parser = new UAParser();
        const deviceInfo = parser.getResult();
        const sessionData = {
          userId: getOrCreateUserId().userId,
          session: getOrCreateUserId().session,
          deviceInfo: deviceInfo,
        };

        let appId = "";
        let utcDate;
        const checkDataLayer = () => {
          if (window?.dataLayer) {
            // console.log("dataLayer bulundu:", window.dataLayer);
            if (window?.dataLayer?.length > 0) {
              window.dataLayer.forEach((element, index) => {
                // console.log(`Element ${index}:`, element);
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

                  return { country: locationData.country || null };
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
                // Yerel geliştirme ve bot kontrolleri
                // if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(location.hostname) || location.protocol === "file:") {
                //   return ignoreEvent("localhost", options);
                // }

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

                const mouseMovement = trackMouseMovement();
                console.log("🚀 ~ trackEvent ~ mouseMovement:", mouseMovement);
                const clickCoordinates = trackClicks();
                console.log(
                  "🚀 ~ trackEvent ~ clickCoordinates:",
                  clickCoordinates
                );
                const timeSpent = trackTimeSpent();
                console.log("🚀 ~ trackEvent ~ timeSpent:", timeSpent);

                const data = documentData(eventType, locationInfo, options)

                if (locationInfo !== null) {
                  socket.emit("trackEvent", data);
                } else {
                  // console.log(
                  //   "getMinimalLocationInfo henüz tanımlanmadı, tekrar kontrol ediliyor..."
                  // );

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

              // window.addEventListener("beforeunload", () => {
              //   trackEvent("page_exit", {
              //     reason: "User leaving the page",
              //   });
              //   socket.emit("disconnect", appId);
              // });

              const localDate22 = new Date();
              const utcDate222 = new Date(
                localDate22.getTime() - localDate22.getTimezoneOffset() * 60000
              ).toISOString();

              window.addEventListener("beforeunload", (event) => {
                console.log("Sayfa kapanıyor veya sekme kapanıyor.");
                // Burada istediğiniz işlemi yapabilirsiniz.

                const data = JSON.stringify(documentData("User leaving the page"));

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
              // Listen for the visibility change event
              // document.addEventListener("visibilitychange", function () {
              //   if (document.visibilityState === "hidden") {
              //     isTabClosing = true;
              //   }
              // });

              // window.addEventListener("beforeunload", function (event) {
              //   if (isTabClosing) {
              //     const data = JSON.stringify({
              //       visitorId: sessionData.userId,
              //       appId: appId || "UnknownApp",
              //       type: "User leaving the page",
              //       time: utcDate222,
              //       url: location.pathname,
              //     });

              //     fetch(`${URL}/api/apps/track-exit-event`, {
              //       method: "POST",
              //       headers: {
              //         "Content-Type": "application/json",
              //       },
              //       body: data,
              //       keepalive: true,
              //     }).catch((error) =>
              //       console.error("Fetch isteği başarısız oldu:", error)
              //     );
              //   }
              // });

              // Fare Hareketi Takibi
              function trackMouseMovement() {
                document.addEventListener("mousemove", (e) => {
                  // console.log(
                  //   "🚀 ~ Mouse Hareketi: X:",
                  //   e.clientX,
                  //   "Y:",
                  //   e.clientY
                  // );
                });
              }

              // Tıklama Noktası Takibi
              function trackClicks() {
                document.addEventListener("click", (e) => {
                  console.log(
                    "🚀 ~ Tıklanan Koordinatlar: X:",
                    e.clientX,
                    "Y:",
                    e.clientY
                  );
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
            // console.log(
            //   "dataLayer henüz tanımlanmadı, tekrar kontrol ediliyor..."
            // );

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
