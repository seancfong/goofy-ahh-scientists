import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { PlotParams } from "react-plotly.js";
import commonCrime from "../pages/api/commonCrime.json";

type Props = {
  setShowTooltip: React.Dispatch<React.SetStateAction<ToolTip | null>>;
  currentPlot: number;
};

export interface ToolTip {
  precinct: number;
  crimeTotal: number;
  commonCrime: string;
  commonCrimeTotal: number;
}

type plotlyData = {
  data: Array<any>;
  layout: Object;
};

const PlotlyComponent = ({ setShowTooltip, currentPlot }: Props) => {
  const [plotlyData, setPlotlyData] = useState<plotlyData>({
    data: [],
    layout: {},
  });

  async function fetchGraph() {
    const endpoint = new URL(
      "create_graph",
      process.env.NEXT_PUBLIC_API_URL!
    ).toString();
    console.log(endpoint);
    const response = await fetch(endpoint);
    const mapData = await response.json();

    console.log(mapData);
    setPlotlyData(mapData);

    const sidebar: Element | null = document.querySelector(".cbfill");
    if (sidebar) {
      sidebar.setAttribute("rx", "8");
    }
    console.log(sidebar);
  }

  async function fetchMap() {
    const endpoint = new URL(
      "create_map",
      process.env.NEXT_PUBLIC_API_URL!
    ).toString();
    console.log(endpoint);
    const response = await fetch(endpoint);
    const mapData = await response.json();

    console.log(mapData);
    setPlotlyData(mapData);

    const sidebar: Element | null = document.querySelector(".cbfill");
    if (sidebar) {
      sidebar.setAttribute("rx", "8");
    }
    console.log(sidebar);
  }

  useEffect(() => {
    if (currentPlot == 0) {
      fetchMap();
    } else if (currentPlot == 1) {
      fetchGraph();
    }
  }, [currentPlot]);

  const config = {
    displayModeBar: false, // this is the line that hides the bar.
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  };

  return (
    <>
      {currentPlot == 0 && (
        <Plot
          data={plotlyData.data ?? {}}
          layout={{
            ...plotlyData?.layout,
            font: {
              family: "var(--manrope-font)",
              color: "rgba(200,200,200,1)",
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            hoverlabel: {},
          }}
          className="w-full h-full"
          config={config}
          useResizeHandler={true}
          onHover={(e: any) => {
            const prec = e.points[0].location;

            // @ts-ignore
            // console.log(prec, e.points[0].z, commonCrime[prec]);
            if (commonCrime[prec]) {
              setShowTooltip({
                precinct: prec,
                crimeTotal: e.points[0].z,
                // @ts-ignore
                commonCrime: commonCrime[prec][0],
                // @ts-ignore
                commonCrimeTotal: commonCrime[prec][1],
              });
            }
          }}
          onUnhover={(e: any) => {
            setShowTooltip(null);
          }}
        />
      )}
      {currentPlot == 1 && (
        <Plot
          data={plotlyData.data ?? {}}
          layout={{
            ...plotlyData?.layout,
            font: {
              family: "var(--manrope-font)",
              color: "rgba(200,200,200,1)",
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            hoverlabel: {},
          }}
          className="w-[90%] h-[90%]"
          config={config}
          useResizeHandler={true}
        />
      )}
    </>
  );
};

export default PlotlyComponent;
