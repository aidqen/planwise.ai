import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function InfoCard({ item }) {
  const { icon: Icon, title, content, isList, color } = item;

  return (
    <Card className="p-6">
      {/* Header with Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`p-3 rounded-full`}
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon className={`w-6 h-6`} style={{color: color}}/>
        </div>
        <h2 className="text-lg">{title}</h2>
      </div>

      {/* List or Content Rendering */}
      {isList ? (
        <>
          <Separator className="my-4" />
          <CardContent>
            <ScrollArea className="h-auto">
              {content.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center py-3 ${
                    index !== content.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="font-medium">{item.name}</span>
                  {item?.startTime && item?.endTime && (
                    <span className="text-sm text-muted-foreground">
                      {item.startTime} - {item.endTime}
                    </span>
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </>
      ) : (
        <p className="text-muted-foreground capitalize text-black/80">{content}</p>
      )}
    </Card>
  );
}
