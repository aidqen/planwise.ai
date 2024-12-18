import { Button } from "@/components/ui/button";
import { InfoCardList } from "./component/InfoCardList";
import { Sparkles } from "lucide-react";

export default function App() {

  return (
    <div className="min-h-screen w-full overflow-y-auto pb-[8em] bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl tracking-tight mb-6 w-full text-start">Schedule Review</h1>
          <p className="text-muted-foreground text-start text-lg text-black/70">Review your preferences before generating your smart schedule</p>
        </div>

        <InfoCardList />

        <div className="py-10 w-full flex flex-row items-center  justify-center gap-20 max-sm:gap-5 pt-7">
          {/* <button
            className="px-2 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white shadow-md border border-secondary whitespace-nowrap"
          >
            Go back
          </button> */}
          <button
            className="flex flex-row items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white text-lg shadow-md border border-secondary whitespace-nowrap"
          >
            <Sparkles className="h-6 w-6 mr-2" />
            Generate AI schedule
          </button>
        </div>
      </div>
    </div>
  );
}
