import React, { useEffect, useState } from "react";


export default function AdvancedProctoring({
  videoRef,
  animationRef,
  detector,
  detect,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  animationRef: React.MutableRefObject<number | null>;
  detector:any,
  detect:any
}) {
  
  useEffect(() => {
    if (detector) {
      detect;
    }
  }, [detector]);


let isProcessing = false;






  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-80 rounded-lg border"
      />

      {/* {warning && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded">
          {warning}
        </div>
      )} */}

      {/* <div className="mt-2 text-sm">Violations: {violations}</div> */}
    </div>
  );
}