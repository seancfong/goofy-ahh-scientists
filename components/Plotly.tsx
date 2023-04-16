import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { PlotParams } from "react-plotly.js";

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
    }

    fetchMap();
  }, []);

  return (
    <Plot
      data={plotlyData.data ?? {}}
      layout={plotlyData?.layout}
      className="w-full h-full"
      useResizeHandler={true}
    />
  );
};

export default PlotlyComponent;
