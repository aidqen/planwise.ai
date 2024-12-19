import { Button } from "@/components/ui/button";
import { InfoCardList } from "./component/InfoCardList";
import { Sparkles } from "lucide-react";
import { GenerateScheduleBtn } from "./component/GenerateScheduleBtn";

export default function App() {

  return (
    <div className="flex flex-col min-h-screen w-full overflow-y-auto pb-[8em] bg-gradient-to-b from-background to-secondary p-6 gap-5">
          <h1 className="text-2xl text-start font-medium text-gray-900 w-full">Schedule Review</h1>
          <p className=" text-start text-base mt-0 text-black/70">Review your preferences before generating your smart schedule</p>

        <InfoCardList />

        <div className="py-10 w-full flex flex-row items-center  justify-center gap-20 max-sm:gap-5 pt-7">
          <GenerateScheduleBtn />
        </div>
    </div>
  );
}
