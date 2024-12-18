import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function InfoCard({ item }) {
  const { icon: Icon, title, content, isList, color } = item

  return (
    <Card className="grid grid-cols-[80px_1fr] shadow-md p-3 hover:border-neutral cursor-pointer hover:bg-gray-400/10 transition-colors">
      {/* Header with Icon and Title */}
      <div className="col-start-1 w-full h-full flex justify-center items-start">
        <div
          className={`col-start-1 p-3 w-max h-max rounded-full`}
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon className={`w-6 h-6`} style={{ color: color }} />
        </div>
      </div>
      <div className="col-start-2 flex flex-col items-start justify-start pt-3 gap-4 mb-4">
        <h2 className="text-lg text-start">{title}</h2>

        {/* List or Content Rendering */}
        {(isList && content.length) ? (
          <>
            <Separator className="my-4" />
            <CardContent>
              <ScrollArea className="h-auto">
                {content.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center py-3 ${
                      index !== content.length - 1 ? 'border-b' : ''
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
          !content.length ? <p>None</p> : <p className="text-muted-foreground capitalize text-black/80">{content}</p> 
        )}
      </div>
    </Card>
  )
}
