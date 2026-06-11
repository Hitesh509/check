'use client'
import { useRouter } from "next/navigation";
import ObjectDetection from "../../components/object-detection"; 
export default function Home1() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Welcome to Home1 Page
      </h1>
      <ObjectDetection />
      <p className="text-lg text-gray-600 mb-6">
        This is your new custom page.
      </p>
      

      <button 
        id="homeBtn"
        onClick={() => {
          // set flag in localStorage to trigger button on Home2
          localStorage.setItem("autoClickCart", "true");
          router.push("/home2");
        }}
        className="px-6 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 hover:scale-105 active:scale-95 transition"
      >
        Home
      </button>
    </div>
  );
}
