"use client"
import Link from "next/link";
import Navbar from "./components/Navbar/navbar";
import Footer from "@/app/components/Footer/footer"
import Header from "./components/Homepage/Header2.jsx"
import LineDesign from "@/app/components/Homepage/linedesign"
import ScrollLockSlideCards from "./components/Homepage/ScrollLockSlideCards";
import PCAndPhone from "./components/Homepage/PCAndPhone";
import { BentoGridDemo } from "./components/Homepage/Grid";
import TryIt from "./components/Homepage/TryIt";
import LaptopAnimation from "./components/Homepage/LaptopTest";
import ScrollSlideText from "./components/Animation/ScrollSlideText";
import HeroAnimation from "./components/Animation/HeroAnimation";


export default function Home() {
  return (
    <>
      <div className="w-full h-full bg-main relative">
        <Navbar></Navbar>
        <div className="w-full h-24 lg:h-0"></div>
        <Header></Header>

        <LineDesign></LineDesign>

        <ScrollLockSlideCards></ScrollLockSlideCards>
        <PCAndPhone></PCAndPhone>
        <BentoGridDemo></BentoGridDemo>
        <TryIt></TryIt>
        <div className="w-full h-auto ">
          <Footer></Footer>
        </div>
      </div>

    </>
  );
}
