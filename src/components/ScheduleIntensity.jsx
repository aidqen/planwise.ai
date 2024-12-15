import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Leaf, Clock, Zap } from "lucide-react";


export function ScheduleIntensity({ value, onChange }) {
    const scheduleOptions = [
        {
          id: "relaxed",
          value: "relaxed",
          title: "Relaxed Schedule",
          description: "More breaks, spread out tasks",
          icon: <Leaf size={24} />,
          borderColor: "border-green-200",
          bgColor: "bg-gradient-to-br from-green-50 to-green-100/50",
          textColor: "text-green-500",
        },
        {
          id: "moderate",
          value: "moderate",
          title: "Moderate Pace",
          description: "Balanced breaks and tasks",
          icon: <Clock size={24} />,
          borderColor: "border-yellow-200",
          bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100/50",
          textColor: "text-yellow-500",
        },
        {
          id: "intense",
          value: "intense",
          title: "Intense Schedule",
          description: "Packed schedule, minimal breaks",
          icon: <Zap size={24} />,
          borderColor: "border-red-200",
          bgColor: "bg-gradient-to-br from-red-50 to-red-100/50",
          textColor: "text-red-500",
        },
      ];
    
      return (
        <div className="w-full max-w-sm mx-auto py-8 space-y-6 rounded-2xl">
          <h3 className="text-lg font-normal text-black/80 text-start">
            How's your day looking?
          </h3>
          <RadioGroup value={value} className="grid gap-4 z-0">
            {scheduleOptions.map((option) => (
              <div
                key={option.id}
                className={`group relative flex items-center space-x-4 p-6 max-sm:p-3 rounded-xl border-2 ${option.borderColor} ${option.bgColor} gap-3 hover:scale-[1.02] shadow-md hover:shadow-lg transition-all duration-100 z-0`}
              >
                <div
                  className={`absolute right-4 top-4 ${option.textColor} opacity-20 group-hover:opacity-100 transition-opacity`}
                >
                  {option.icon}
                </div>
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id} className="flex flex-col cursor-pointer gap-2 py-2">
                  <span className="font-normal text-lg text-gray-800">{option.title}</span>
                  <span className="text-sm text-black/40 mt-1">{option.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
};