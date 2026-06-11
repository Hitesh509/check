'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ObjectDetection from "../../components/object-detection"; 
export default function PublicLayout({ children }) {

    return (
        <>
            <Banner />
            <Navbar />
            
            {children}
            <Footer />
        </>
    );
}
