"use client";

import useWidth from "@/app/hooks/useWidth";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LineChartAnimation = () => {
  const { width } = useWidth();

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

  const [points, setPoints] = useState(initialPoints);

  // Rastgele bir Y değeri oluşturucu
  const getRandomY = () => Math.floor(Math.random() * 120 - 60);

  // Path oluşturucu ve noktaları path'e sabitleyici
  const createSmoothPathAndAlignedPoints = (points) => {
    let path = `M ${points[0].x},${points[0].y}`;
    const alignedPoints = [{ x: points[0].x, y: points[0].y }];

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      // Bezier kontrol noktalarını hesapla
      const controlX = (current.x + next.x) / 2;
      const controlY = (current.y + next.y) / 2;

      // Path'e Q komutunu ekle
      path += ` Q ${current.x},${current.y} ${controlX},${controlY}`;
      alignedPoints.push({ x: controlX, y: controlY }); // Noktayı path üzerinde hizala
    }

    path += ` T ${points[points.length - 1].x},${points[points.length - 1].y}`;
    alignedPoints.push(points[points.length - 1]);

    return { path, alignedPoints };
  };

  // Her 2.5 saniyede bir noktaları güncelle ve path'i yeniden oluştur
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoints = points.map((point) => ({
        x: point.x,
        y: getRandomY(),
      }));
      setPoints(newPoints);
    }, 2500);

    return () => clearInterval(interval);
  }, [points]);

  // Path ve hizalı noktaları oluştur
  const { path: pathData, alignedPoints } = createSmoothPathAndAlignedPoints(points);

  if (width < 1024) {
    return (
      <div className="relative w-full h-[800px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[900px] overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 -700 900 500"
          preserveAspectRatio="xMinYMin meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#19ae9d" />
              <stop offset="50%" stopColor="#19ae9d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#19ae9d" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <motion.path
            d={`${pathData} L 900,500 L 0,500 Z`}
            fill="url(#lineGradient)"
            animate={{ d: `${pathData} L 900,500 L 0,500 Z` }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
              duration: 2,
            }}
          />

          <motion.path
            d={pathData}
            fill="none"
            stroke="#19ae9d"
            strokeWidth="3"
            animate={{ d: pathData }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
              duration: 2,
            }}
          />

          {alignedPoints.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#19ae9d"
              animate={{ cx: point.x, cy: point.y }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
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
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#19ae9d" />
            <stop offset="50%" stopColor="#19ae9d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#19ae9d" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <motion.path
          d={`${pathData} L 900,180 L 0,180 Z`}
          fill="url(#lineGradient)"
          animate={{ d: `${pathData} L 900,180 L 0,180 Z` }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
            duration: 2,
          }}
        />

        <motion.path
          d={pathData}
          fill="none"
          stroke="#19ae9d"
          strokeWidth="3"
          animate={{ d: pathData }}
          transition={{
            type: "spring",
              stiffness: 200,
              damping: 50,
              duration: 2,
          }}
        />

        {alignedPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#19ae9d"
            animate={{ cx: point.x, cy: point.y }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
              duration: 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default LineChartAnimation;
