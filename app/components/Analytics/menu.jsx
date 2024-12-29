"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiHome3Line, RiAdvertisementLine } from "react-icons/ri";
import { AiOutlineSearch, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdOutlineTrackChanges, MdLocalPhone, MdOutlineFeedback, MdKeyboardArrowUp, MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { FiDivideSquare, FiSettings } from "react-icons/fi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";
import { BiBarChartAlt2 } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import useWidth from "@/app/hooks/useWidth";

const menu = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const [id, setId] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [showSubmenu, setShowSubmenu] = useState(false); // Yan menü kontrolü

  const { width } = useWidth()

  useEffect(() => {
    const paramId = params.get("id");
    if (paramId) {
      setId(paramId);
    }
  }, [params]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sidebar = [
    {
      title: "Dashboard",
      items: [{ icon: RiHome3Line, title: "Homepage", url: `/analytics?id=${id}` }],
    },
    {
      title: "Analytics",
      items: [
        { icon: FaUsers, title: "User Interactions", url: `/user-interactions?id=${id}` },
        { icon: BsGraphUp, title: "Predictive Analytics", url: `/predictive-analytics` },
        { icon: BiBarChartAlt2, title: "Reports", url: `/reports` },
      ],
    },
    {
      title: "SEO & Marketing",
      items: [
        { icon: AiOutlineSearch, title: "SEO (Web?)", url: `/seo` },
        { icon: RiAdvertisementLine, title: "Ads Management", url: `/ads-management` },
        { icon: HiOutlinePresentationChartBar, title: "Channel Management", url: `/channel-management` },
      ],
    },
    {
      title: "Optimization",
      items: [
        { icon: FiDivideSquare, title: "A/B Tests", url: `/ab-tests` },
        { icon: MdOutlineTrackChanges, title: "Goals", url: `/goals` },
      ],
    },
    {
      title: "Cross-Platform",
      items: [
        { icon: TbDeviceDesktopAnalytics, title: "Cross Platform (W+M?)", url: `/cross-platform` },
      ],
    },
  ];

  const submenuItems = [
    { icon: FiSettings, title: "Settings", url: `/settings` },
    { icon: MdOutlineFeedback, title: "Give a feedback", url: `/feedback` },
    { icon: AiOutlineQuestionCircle, title: "Help", url: `/help` },
    { icon: MdLocalPhone, title: "Contact Us", url: `/contact` },
  ];

  if (width <= 1024) {

    return (
      <div className="w-full h-full px-4 mt-2 relative flex flex-col justify-between">
  
        <div className="flex-grow">
          {sidebar.map((section, index) => (
            <div key={index} className="mb-4">
              {/* Ana başlık */}
              <div
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between cursor-pointer px-4 py-2 bg-primaryGray/10 hover:bg-primaryGray/20 rounded-md"
              >
                <div className="text-base font-medium text-stone-900">{section.title}</div>
                <div>{openSections[section.title] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
  
              </div>
              {/* Alt başlıklar */}
              <AnimatePresence>
                {openSections[section.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {section.items.map((item, subIndex) => {
                      const isActive = pathname === item.url;
                  
                      return (
                        <Link
                          key={subIndex}
                          href={item.url}
                          className={`flex items-center w-full px-6 py-2 transition-all text-base ${isActive
                            ? "bg-primary text-main rounded-md"
                            : "hover:bg-primaryGray/15"
                            }`}
                        >
                          <item.icon
                            className={`text-2xl mr-2 ${isActive ? "text-white" : "text-primary"
                              }`}
                          />
                          <div>{item.title}</div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>



        {/* Sabit Linkler */}
        <div className="relative ">
          <div
            onClick={() => setShowSubmenu(!showSubmenu)}
            className="flex items-center justify-between cursor-pointer px-4 py-2 w-full  bg-primaryGray/10 hover:bg-primaryGray/20 rounded-md "
          >
            <div className="text-base font-medium">More</div>
            <div>{showSubmenu ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>
          </div>
          <AnimatePresence>
            {showSubmenu && (
             <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
                {submenuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="flex items-center px-6 py-2 transition-all text-base  w-full h-auto hover:bg-primaryGray/15 "
                  >
                    <item.icon className="text-2xl text-primary mr-2" />
                    <div className="text-sm text-center ">{item.title}</div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>



        </div>
  
      </div>
    );
  }



  return (
    <div className="w-full h-5/6 px-4 mt-2 relative flex flex-col justify-between">

      <div className="flex-grow">
        {sidebar.map((section, index) => (
          <div key={index} className="mb-4">
            {/* Ana başlık */}
            <div
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between cursor-pointer px-4 py-2 mb-1   bg-primaryGray/10 hover:bg-primaryGray/20 rounded-md"
            >
              <div className="text-base font-medium text-stone-900">{section.title}</div>
              <div>{openSections[section.title] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</div>

            </div>
            {/* Alt başlıklar */}
            <AnimatePresence>
              {openSections[section.title] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {section.items.map((item, subIndex) => {
                    const isActive = `${pathname}?id=${id}` === item.url;
          
                    return (
                      <Link
                        key={subIndex}
                        href={item.url}
                        className={`flex items-center gap-3 w-full px-6 py-2 transition-all text-base ${isActive
                          ? "bg-primary/90 rounded-md text-main"
                          : "hover:bg-primaryGray/15"
                          }`}
                      >
                        <item.icon
                          className={`text-2xl ${isActive ? "text-main" : "text-primary"
                            }`}
                        />
                        <div>{item.title}</div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* Sabit Linkler */}
      <div className="relative ">
        <div
          onClick={() => setShowSubmenu(!showSubmenu)}
          className="flex items-center justify-between cursor-pointer px-4 py-2 w-full mt-4 bg-primaryGray/10 hover:bg-primaryGray/20 rounded-md "
        >
          <div className="text-base font-medium">More</div>
          <div>{showSubmenu ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}</div>
        </div>
        <AnimatePresence>
          {showSubmenu && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="absolute left-full top-0 flex ml-4  gap-2 rounded-md shadow-xl border border-stone-900/20 bg-main overflow-hidden p-4"
            >
              {submenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="flex flex-row items-center justify-center w-[150px] h-[40px] bg-primary py-2 overflow-hidden hover:bg-secondary rounded-md"
                >
                  <item.icon className="text-2xl text-main mr-2" />
                  <div className={`text-sm text-center text-main `}>{item.title}</div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full h-14"></div>
      </div>

    </div>
  );
};

export default menu;
