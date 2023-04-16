import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { PlotParams } from "react-plotly.js";
import commonCrime from "../pages/api/commonCrime.json";

type Props = {};

type plotlyData = {
  data: Array<any>;
  layout: Object;
};

const PlotlyComponent = (props: Props) => {
  const [plotlyData, setPlotlyData] = useState<plotlyData>({
    data: [],
    layout: {},
  });

  useEffect(() => {
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

    fetchMap();
  }, []);

  const config = {
    displayModeBar: false, // this is the line that hides the bar.
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  };

  return (
    <Plot
      data={plotlyData.data ?? {}}
      layout={{
        ...plotlyData?.layout,
        font: { family: "var(--manrope-font)", color: "rgba(200,200,200,1)" },
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
        console.log(prec, e.points[0].z, commonCrime[prec]);
      }}
    />
  );
};

export default PlotlyComponent;
