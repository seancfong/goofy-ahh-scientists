import PlotlyComponent from "@/components/Plotly";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useMouse } from "react-use";
import { ToolTip } from "@/components/Plotly";

export default function Home() {
  const ref = React.useRef(null);
  const { docX, docY } = useMouse(ref);
  const [showTooltip, setShowTooltip] = useState<ToolTip | null>(null);

  return (
    <>
      <Head>
        <title>Montreal Search</title>
      </Head>
      <main
        className="w-screen h-screen flex flex-col items-center font-primary bg-slate-700 overflow-hidden relative"
        ref={ref}
      >
        <PlotlyComponent setShowTooltip={setShowTooltip} />
        {showTooltip != null && (
          <div
            className="absolute w-96 h-48 bg-slate-800 rounded-lg text-white flex flex-col justify-center items-center p-5 text-center"
            style={{ top: `${docY}px`, left: `${docX}px` }}
          >
            <h4 className="text-3xl mb-3 font-bold">
              [{showTooltip.precinct}]
            </h4>
            <h5 className="text-xl">Total Crimes:</h5>
            <p className="">{showTooltip.crimeTotal}</p>
            <h5 className="text-xl">Most common crime:</h5>
            <p className="">
              <span className="text-red-500">{showTooltip.commonCrime}</span>
              &nbsp; ({showTooltip.commonCrimeTotal})
            </p>
          </div>
        )}
        {/* <h1 className="text-3xl font-title">Montreal Crime Dashboard</h1>
        <form>
          <input
            type="text"
            name="search"
            id="search"
            className="border-2 border-gray-500 rounded-sm p-1"
          />
        </form> */}
      </main>
    </>
  );
}

// export async function getStaticProps() {
//   const endpoint = new URL(
//     "create_map",
//     process.env.NEXT_PUBLIC_API_URL!
//   ).toString();
//   console.log(endpoint);
//   const response = await fetch(endpoint);
//   const mapData = await response.json();

//   return {
//     props: {
//       mapData,
//     },
//   };
// }
