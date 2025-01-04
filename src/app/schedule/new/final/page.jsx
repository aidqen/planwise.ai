import { Button } from "@/components/ui/button";
import { InfoCardList } from "./component/InfoCardList";
import { Sparkles } from "lucide-react";
import { GenerateScheduleBtn } from "./component/GenerateScheduleBtn";

export default function App() {

  return (
    <div className="flex flex-col  min-h-screen w-[50%] overflow-y-hidden pb-[8em] bg-gradient-to-b from-background to-secondary p-6 gap-3">
          <h1 className="w-full text-2xl font-medium text-center text-gray-900">Schedule Review</h1>
          <p className="mt-0 mb-5 text-base text-center text-black/70">Review your preferences before generating your smart schedule</p>

        <InfoCardList />

        <div className="flex flex-row gap-20 justify-center items-center py-10 pt-7 w-full max-sm:gap-5">
          <GenerateScheduleBtn />
        </div>
    </div>
  );
}
