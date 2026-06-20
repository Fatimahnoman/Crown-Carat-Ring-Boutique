"use client"
import Homepage from "@/components/Homepage";
import "aos/dist/aos.css"; // Import AOS CSS
import AOS from "aos";
import { useEffect } from "react";
import About from "./about/page";
import Contact from "./contact/page";
import Ring from "./ring/page";
 


 export default  function Home (){
  useEffect(() =>{
    AOS.init({
      easing: "ease-out-back",
      duration: 1200,
      delay:100,
      mirror: true,
      anchorPlacement: "bottom-bottom",
      offset: 160,
    });
    AOS.refresh();
  },[]);
  return(
    <div>
      <Homepage />
      <About />
      <Ring />
       <Contact />
    </div>
  )
 }