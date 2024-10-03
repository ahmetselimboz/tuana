import useWidth from "@/app/hooks/useWidth";
import React, { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from 'react-tooltip';


const geoUrl = '/countries.geo.json';


const WorldMap = ({ mergeData }) => {

  const [tooltipContent, setTooltipContent] = useState("");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);
  const { width } = useWidth()







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
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event) => {
        

        const x = event.offsetX;
        const y = event.offsetY;
        setMousePosition({ x, y });
      };

      window.addEventListener('mousemove', handleMouseMove);


      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);



  return (
    <>
      <ComposableMap projectionConfig={{}} className="h-full lg:w-auto w-full">
        <Geographies geography={geoUrl} >
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
          <div ref={mapContainerRef} style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} data-tooltip-content="" className=" absolute top-0 px-3 py-1 border border-stone-900/20 rounded-md shadow-xl min-w-[120px] pointer-events-none  h-[50px] bg-main">
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
