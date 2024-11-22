'use client'
import { useEffect, useState } from "react";
import Hero from "./component/hero";
import CallToAction from "./component/calltoaction";
import Pricing from "./component/pricing";
import Footer from "./component/footer";

export default function Home() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
    <Hero />
    <CallToAction />
    <Pricing />
    </>
  );
}
