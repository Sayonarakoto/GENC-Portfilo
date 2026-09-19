import React from "react";
import HeroAnimation from "./HeroAnimation";
import WorkflowDemo from "./WorkflowDemo";
import LatecomerFeature from "./LatecomerFeature";
import GatePassScene from "./GatePassScene";
import SpecialPassScene from "./SpecialPassScene";
import LibraryAuditScene from "./LibraryAuditScene";
import ResponsiveShowcase from "./ResponsiveShowcase";
import "./index.css";

function App() {
  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen w-full overflow-x-hidden">
      <HeroAnimation />
      <WorkflowDemo />
      <LatecomerFeature />
      <GatePassScene />
      <SpecialPassScene />
      <LibraryAuditScene />
      <ResponsiveShowcase />
    </div>
  );
}
export default App;
