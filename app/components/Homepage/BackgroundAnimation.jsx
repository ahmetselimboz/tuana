"use client";

import useWidth from "@/app/hooks/useWidth";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LineChartAnimation = () => {

  const { width } = useWidth()

  // Noktaların başlangıç koordinatları
  const initialPoints = [
    { x: 0, y: 100 },
    { x: 100, y: 30 },
    { x: 200, y: 90 },
    { x: 300, y: -40 },
    { x: 400, y: 60 },
    { x: 500, y: -20 },
    { x: 600, y: 30 },
    { x: 700, y: -30 },
    { x: 800, y: 20 },
    { x: 900, y: -40 },
  ];

  // Noktaların koordinatlarını state içinde tutuyoruz
  const [points, setPoints] = useState(initialPoints);

  // Rastgele bir Y değeri oluşturucu
  const getRandomY = () => Math.floor(Math.random() * 120 - 60);

  // Her 2 saniyede bir noktaları ve path'i güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoints = points.map((point) => ({
        x: point.x,
        y: getRandomY(),
      }));
      setPoints(newPoints);
    }, 3000); // Her 4 saniyede bir çalışır

    return () => clearInterval(interval);
  }, [points]);

  // Path dizesini oluşturuyoruz
  const pathData = points
    .map((point, index) =>
      index === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
    )
    .join(" ");


  if (width < 1024) {
    return (
      <div className="relative w-full h-[800px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[900px] overflow-hidden ">
        <svg
          className="w-full h-full"
          viewBox="0 -700 900 500"
          preserveAspectRatio="xMinYMin meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient tanımı */}
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#19ae9d" />
              <stop offset="50%" stopColor="#19ae9d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#19ae9d" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Dolgu alanı animasyonu */}
          <motion.path
            d={`${pathData} L 900,500 L 0,500 Z`}
            fill="url(#lineGradient)"
            animate={{ d: `${pathData} L 900,500 L 0,500 Z` }}
            transition={{
              type: "spring",
              stiffness: 200, // Daha sert bir yay
              damping: 50, // Daha az sönümleme ile belirgin hareket
              duration: 2,
            }}
          />

          {/* Çizgi animasyonu */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#19ae9d"
            strokeWidth="3"
            animate={{ d: pathData }}
            transition={{
              type: "spring",
              stiffness: 200, // Daha sert bir yay
              damping: 50, // Daha az sönümleme ile belirgin hareket
              duration: 2,
            }}
          />

          {/* Noktalar */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#19ae9d"
              animate={{ cx: point.x, cy: point.y }}
              transition={{
                type: "spring",
                stiffness: 200, // Daha sert bir yay
                damping: 50, // Daha az sönümleme ile belirgin hareket
                duration: 2,
              }}
            />
          ))}
        </svg>
      </div>
    );
  }


  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[900px] overflow-hidden opacity-70">
      <svg
        className="w-full h-full"
        viewBox="0 -220 900 180"
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient tanımı */}
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#19ae9d" />
            <stop offset="50%" stopColor="#19ae9d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#19ae9d" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Dolgu alanı animasyonu */}
        <motion.path
          d={`${pathData} L 900,180 L 0,180 Z`}
          fill="url(#lineGradient)"
          animate={{ d: `${pathData} L 900,180 L 0,180 Z` }}
          transition={{
            type: "spring",
            stiffness: 200, // Daha sert bir yay
            damping: 50, // Daha az sönümleme ile belirgin hareket
            duration: 2,
          }}
        />

        {/* Çizgi animasyonu */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="#19ae9d"
          strokeWidth="3"
          animate={{ d: pathData }}
          transition={{
            type: "spring",
            stiffness: 200, // Daha sert bir yay
            damping: 50, // Daha az sönümleme ile belirgin hareket
            duration: 2,
          }}
        />

        {/* Noktalar */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#19ae9d"
            animate={{ cx: point.x, cy: point.y }}
            transition={{
              type: "spring",
              stiffness: 200, // Daha sert bir yay
              damping: 50, // Daha az sönümleme ile belirgin hareket
              duration: 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default LineChartAnimation;
