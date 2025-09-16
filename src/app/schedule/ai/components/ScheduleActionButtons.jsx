import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

export function ScheduleActionButtons({ 
  showOriginal, 
  setShowOriginal, 
  handleRejectChanges, 
  handleAcceptChanges 
}) {
  return (
    <div className="flex fixed left-0 bottom-4 z-50 gap-3 justify-center w-full md:sticky">
      <Button
        onClick={() => setShowOriginal(prev => !prev)}
        className="flex gap-2 items-center px-2 py-1 text-xs text-white bg-blue-500 shadow-md md:py-2 md:px-4 hover:bg-blue-600"
      >
        {showOriginal ? 'Show Edited' : 'Show Original'}
      </Button>
      <Button
        onClick={handleRejectChanges}
        className="flex gap-2 items-center px-2 py-1 text-xs text-white bg-red-500 shadow-md md:py-2 md:px-4 hover:bg-red-600"
      >
        <X className="w-4 h-4" />
        Reject Changes
      </Button>
      <Button
        onClick={handleAcceptChanges}
        className="flex gap-2 items-center px-2 py-1 text-xs text-white bg-green-500 shadow-md md:py-2 md:px-4 hover:bg-green-600"
      >
        <Check className="w-4 h-4" />
        Accept Changes
      </Button>
    </div>
  );
}
