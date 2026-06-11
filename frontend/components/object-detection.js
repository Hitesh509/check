'use client'
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { renderPredictions } from "@/utils/render-prediction";

let detectInterval;

export default function ObjectDetection() {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  async function runCoco() {
    setIsLoading(true);
    const net = await cocoSSDLoad();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 100); // slightly slower interval for performance
  }

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const video = webcamRef.current.video;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      const detectedObjects = await net.detect(video, undefined, 0.6);
      const context = canvasRef.current.getContext("2d");

      renderPredictions(detectedObjects, context, dispatch, router);
    }
  }

  const showMyVideo = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const video = webcamRef.current.video;
      video.width = video.videoWidth;
      video.height = video.videoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showMyVideo();
    return () => clearInterval(detectInterval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading ? (
        <div className="gradient-text text-center text-lg font-medium">
          Loading Model...
        </div>
      ) : (
        <div className="relative flex-1 w-full rounded-lg shadow-lg overflow-hidden flex justify-center items-center bg-gray-200">
          {/* Webcam feed fills parent */}
          <Webcam
            ref={webcamRef}
            className="w-full h-full object-cover"
            muted
            videoConstraints={{ facingMode: "environment" }}
          />
          {/* Canvas overlays on webcam */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
