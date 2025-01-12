// const views = [
//     {
//         id: 'details',
//         label: 'Details',
//         icon: <ListChecks className="w-4 h-4" />
//     },
//     {
//         id: 'chat',
//         label: 'AI Chat',
//         icon: <MessageCircle className="w-4 h-4" />
//     }
// ];



// export const sidebarContent = (
    
//     <>
//         <CardHeader className="flex flex-col gap-1.5 pt-0 pb-6 md:pb-8 space-y-0">
//             <CardTitle className="text-lg font-semibold text-black dark:text-white">
//                 Schedule Details
//             </CardTitle>
//             <CardDescription className="mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
//                 {activeView === "chat" ? "Ask AI to modify your schedule" : "View your preferences and tasks"}
//             </CardDescription>
//         </CardHeader>
//         <CardContent className="p-0">
//             <div className="grid grid-cols-[50%_50%] gap-1 p-2 mx-5 mb-4 rounded-lg backdrop-blur-sm bg-gray-100/80">
//                 {views.map(view => (
//                     <button
//                         key={view.id}
//                         onClick={() => setActiveView(view.id)}
//                         className={`flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
//                             activeView === view.id
//                                 ? "bg-white text-blue-600 shadow-sm"
//                                 : "text-gray-600 hover:bg-white/50"
//                         }`}
//                     >
//                         {view.icon}
//                         {view.label}
//                     </button>
//                 ))}
//             </div>
//             <div className="overflow-hidden h-[calc(100vh-16rem)] md:h-[calc(100vh-16rem)] max-h-[60vh] md:max-h-none">
//                 {activeView === "details" ? (
//                     <ScheduleDetails
//                         schedule={scheduleToShow}
//                         openSection={openSection}
//                         toggleSection={toggleSection}
//                     />
//                 ) : (
//                     <AIChat 
//                         chat={schedule?.chat} 
//                         schedule={schedule} 
//                         onScheduleEdit={onScheduleEdit}
//                         setIsLoading={setIsLoading}
//                         isLoading={isLoading}
//                         setSchedule={setSchedule}
//                     />
//                 )}
//             </div>
//         </CardContent>
//     </>
// )