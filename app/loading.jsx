import React from "react";
import { Suspense } from "react";

const LoadingPage = () => {

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <div className="loader">
        <div className="spinner"></div>
      </div>
    </Suspense>

  );
};

export default LoadingPage;
