
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import MobileHeader from "./MobileHeader";

// Lazy load the mobile footer
const MobileFooter = lazy(() => import("./MobileFooter"));

const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader />
      <main className="flex-grow pb-16"> {/* Padding bottom for mobile navigation */}
        <Outlet />
      </main>
      <Suspense fallback={<div className="h-16"></div>}>
        <MobileFooter />
      </Suspense>
    </div>
  );
};

export default MobileLayout;
