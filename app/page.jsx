"use client"
import Link from "next/link";
import Navbar from "./components/Navbar/navbar";
import Footer from "@/app/components/Footer/footer"
import Header from "@/app/components/Homepage/header"
import LineDesign from "@/app/components/Homepage/linedesign"

export default function Home() {
  return (
    <>
    <div className="w-full h-full relative">
      <Navbar></Navbar>
      <div className="w-full h-24 lg:h-0"></div>
      <Header></Header>
      <LineDesign></LineDesign>
      <div className="w-full h-auto ">
        <Footer></Footer>
      </div>
    </div>

  </>
  );
}
