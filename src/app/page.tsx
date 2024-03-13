import AssetsCharts from "./Components/AssetsCharts";
import CurrentValue from "./Components/CurrentValue";
import FinancialNews from "./Components/FinancialNews";
import HistoricalValue from "./Components/HistoricalValue";

export default function Home() {
  return (
    <main className="flex flex-col ">
     
      <div className="flex min-h-screen justify-center items-center p-4 md:p-24 overflow-x-hidden">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row-2">
        <div className="col-span-1 md:col-span-1 lg:col-span-1 mt-9">
          <div className="max-w-screen-lg mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Your Dashboard</h1>
            <CurrentValue />
            <FinancialNews />
          </div>
        </div>
        <div className="col-span-2 md:col-span-2 lg:col-span-2">
          <div className="max-w-screen-lg mx-auto">
            <HistoricalValue />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="max-w-screen-lg mx-auto">
            <AssetsCharts />
          </div>
        </div>
      </div>
      </div>
      
    </main>
  );
}
