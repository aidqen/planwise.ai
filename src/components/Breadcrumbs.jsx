import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react";


export function Breadcrumbs({ currentIdx, setStep }) {

    const breadcrumbItems = [
        { label: "Preferences"},
        { label: "Goals"},
        { label: "Routines"},
    ];

    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList className="flex w-[30em]">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                    {/* <div key={index} className="flex flex-row items-center"> */}

                            <BreadcrumbItem onClick={() => setStep(index)}>
                                <BreadcrumbLink
                                    className={`${currentIdx >= index
                                        ? "text-green-600 font-semibold"
                                        : "text-black/70"
                                        } max-sm:text-sm text-lg`}
                                >
                                    {item.label}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator className={`${currentIdx >= index
                                        ? "text-green-600 font-semibold"
                                        : "text-black/70"}`} />}
                     {/* </div> */}
                    </React.Fragment>

                ))}
            </BreadcrumbList>
        </Breadcrumb >
    );
}
