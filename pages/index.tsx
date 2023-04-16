import PlotlyComponent from "@/components/Plotly";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useMouse } from "react-use";
import { ToolTip } from "@/components/Plotly";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Home() {
  const ref = React.useRef(null);
  const { docX, docY } = useMouse(ref);
  const [showTooltip, setShowTooltip] = useState<ToolTip | null>(null);
  const [currentPlot, setCurrentPlot] = useState(0);

  return (
    <>
      <Head>
        <title>Montreal Search</title>
      </Head>
      <main
        className="w-screen h-screen flex flex-col items-center font-primary bg-slate-700 overflow-hidden relative"
        ref={ref}
      >
        <PlotlyComponent
          setShowTooltip={setShowTooltip}
          currentPlot={currentPlot}
        />
        {showTooltip != null && currentPlot == 0 && (
          <div
            className="absolute w-[40rem] h-64 bg-slate-800 rounded-xl text-white flex justify-center items-center p-5 text-center"
            style={{ top: `${docY}px`, left: `${docX}px` }}
            // style={{ top: `100px`, left: `100px` }}
          >
            <div>
              <h4 className="text-3xl mb-3 font-bold">
                [{showTooltip.precinct}]
              </h4>
              <h5 className="text-xl">Total Crimes:</h5>
              <p className="text-[#F9DBBB]">{showTooltip.crimeTotal}</p>
              <h5 className="text-xl">Most common crime:</h5>
              <p className="font-light tracking-wider">
                {showTooltip.commonCrime}
                <span className="text-red-500">
                  &nbsp; ({showTooltip.commonCrimeTotal})
                </span>
              </p>
            </div>
            <Plot
              useResizeHandler
              className="w-[12rem] h-full"
              data={[
                {
                  values: [
                    showTooltip.commonCrimeTotal,
                    showTooltip.crimeTotal - showTooltip.commonCrimeTotal,
                  ],
                  marker: { colors: ["#EF4444", "#F9DBBB"] },
                  hole: 0.7,
                  type: "pie",
                  textinfo: "none",
                  direction: "clockwise",
                  sort: true,
                },
              ]}
              layout={{
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                showlegend: false,
                margin: { l: -500, r: 0, t: 0, b: 0 },
              }}
              config={{ displayModeBar: false }}
            />
          </div>
        )}
        <div className="absolute top-0 left-0 w-screen text-center mt-10">
          <h1 className="text-4xl font-title text-white tracking-wider">
            Montreal Crime Dashboard
          </h1>
        </div>
        <div className="absolute bottom-8 left-20 bg-slate-500 text-white flex items-center rounded-lg">
          <button
            className="px-5 py-2"
            onClick={() => {
              setCurrentPlot(0);
            }}
          >
            Map View
          </button>
          <button
            className="px-5 py-2"
            onClick={() => {
              setCurrentPlot(1);
            }}
          >
            Graph View
          </button>
        </div>
        {/* <form>
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
