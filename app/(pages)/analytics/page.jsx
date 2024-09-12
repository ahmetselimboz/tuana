"use client"

import React, { useEffect, useState } from 'react'
import AuthenticatedNavbar from "@/app/components/Navbar/authenticatednavbar"

const Analytics = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDropdown, setSelectedDropdown] = useState(new Date() ? "today" : null);
  const [activeDevices, setActiveDevices] = useState(0);


  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  }

  useEffect(() => {
    reset()
  }, [selectedDate]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleDeviceClick = (index) => {
    setActiveDevices(index);
  };


  return (
    <>
      <div className=' w-full h-fit'>
        <AuthenticatedNavbar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedDropdown={setSelectedDropdown} />
      </div>
    </>
  )
}

export default Analytics