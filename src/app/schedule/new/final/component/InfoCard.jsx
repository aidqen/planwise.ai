

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export function InfoCard({ item }) {
  const { icon: Icon, title, content, isList, color } = item;

  function navigateToHref() {
  //   router.push(`/schedule/new/${title}`)
  }

  return (
    <Card onClick={navigateToHref} className="grid  grid-cols-[65px_1fr] grid-rows-[auto_1fr] border-0 bg-transparent shadow-none p-4 ps-0 hover:border-neutral cursor-pointer hover:bg-gray-400/10 transition-colors">
      {/* Icon in Row 1, Column 1 */}
      <div className="flex justify-center items-center">
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>

      {/* Title in Row 1, Column 2 */}
      <div className="flex items-center">
        <h2 className="text-base font-medium text-start">{title}</h2>
      </div>

      {/* Content in Row 2, Spanning Both Columns */}
      <div className="flex flex-col col-start-2">
        {isList && content.length ? (
          <>
            <Separator />
            <CardContent className="p-0">
              <ScrollArea className="h-auto">
                {content.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col justify-between items-start py-1.5 ${
                      index !== content.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="font-medium truncate max-w-[90%] text-sm text-black/70">{item.name}</span>
                    {item?.startTime && item?.endTime && (
                      <span className="text-sm text-muted-foreground text-black/60">
                        {item.startTime} - {item.endTime}
                      </span>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </>
        ) : (
          content.length ? (
            <p className="text-sm font-medium capitalize text-muted-foreground text-black/60">
              {content}
            </p>
          ) : (
            <p className="text-sm italic font-medium text-muted-foreground text-black/70">None</p>
          )
        )}
      </div>
    </Card>
  );
}