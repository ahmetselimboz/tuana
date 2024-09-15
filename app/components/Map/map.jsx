import React, { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from 'react-tooltip';


const geoUrl = '/countries.geo.json';


const WorldMap = ({ mergeData }) => {
  console.log("🚀 ~ WorldMap ~ mergeData:", mergeData)
  const [tooltipContent, setTooltipContent] = useState("");
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);



  



  const handleMouseEnter = (geo) => {
    const countryName = geo.properties.name;
  
    if (countryName) {
      const foundItem = mergeData.find((item) => countryName === item.name);

      if (foundItem) {

        setTooltipContent({ code: foundItem.code, image: foundItem.image, country: foundItem.name, visitor: foundItem.visitor });

      } else {
        setTooltipContent(`${countryName}`);
      }
    } else {
      setTooltipContent("Ülke bilgisi bulunamadı");
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      setMousePosition({ x: x, y: y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);


  return (
    <>
      <ComposableMap projectionConfig={{ scale: 160 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {

              const name = geo.properties.name; // Ülke adını alın
              const countryData = mergeData.find((item) => name === item.name); // Ülke verisini bulun
              const visitors = countryData ? countryData.visitor : 0; // Ziyaretçi sayısını alın, yoksa 0 olarak ayarlayın
              const fillColor = visitors > 0 ? "#19ae9d" : "#D6D6DA"; // Ziyaretçi sayısı 0'dan büyükse maviye boya

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    default: { fill: fillColor, outline: "none", stroke: "#14897b4e" },
                    hover: { fill: "#19ae9d", outline: "none" },
                    pressed: { fill: "#14897c", outline: "none" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      {
        tooltipContent.country ? (
          <div ref={mapContainerRef} style={{ transform: `translate(${mousePosition.x - 290}px, ${mousePosition.y - 180}px)` }} data-tooltip-content="" className=" absolute top-0 px-3 py-1 border border-stone-900/20 rounded-md shadow-xl min-w-[120px] h-[50px] bg-main">
            <div className="w-full flex items-center gap-2">
              <img src={tooltipContent.image} alt="" className="w-[20px]" />
              <div className="font-dosis text-sm text-stone-900">{tooltipContent.country}</div>
            </div>
            <div className="w-full flex items-center gap-1">
              <div className="font-dosis text-sm text-stone-900">Visitors:</div>
              <div className="font-dosis text-sm text-stone-900">{tooltipContent.visitor}</div>
            </div>
          </div>
        ) : (
          <div></div>
        )
      }

    </>
  );
};

export default WorldMap;
