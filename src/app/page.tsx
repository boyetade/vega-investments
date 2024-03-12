import AssetsCharts from "./Components/AssetsCharts";
import CurrentValue from "./Components/CurrentValue";
import HistoricalValue from "./Components/HistoricalValue";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-4 md:p-24">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row-2 ">
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <CurrentValue />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <HistoricalValue />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <AssetsCharts />
        </div>
      </div>
    </main>
  );
}


