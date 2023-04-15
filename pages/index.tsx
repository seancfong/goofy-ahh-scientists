import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Montreal Search</title>
      </Head>
      <main className="w-screen h-screen flex justify-center items-center font-primary">
        <div>
          <h1 className="text-3xl font-title">Le Montréal Crime Search</h1>
          <form>
            <input
              type="text"
              name="searcb"
              id="search"
              className="border-2 border-gray-500 rounded-sm p-1"
            />
          </form>
        </div>
      </main>
    </>
  );
}
