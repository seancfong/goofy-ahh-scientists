import PlotlyComponent from "@/components/Plotly";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Montreal Search</title>
      </Head>
      <main className="w-screen h-screen flex flex-col items-center font-primary">
        <PlotlyComponent />
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
