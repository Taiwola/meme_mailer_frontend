import React from 'react'
import MaxWidthWrapper from './maxwidthwrapper';
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';


const features = [
    {
      name: "Instant Newsletter Delivery",
      Icon: ArrowDownToLine,
      Description: "Send newsletters instantly to your subscribers, and track delivery in real-time."
    },
    {
      name: "Guaranteed Engagement",
      Icon: CheckCircle,
      Description: "Our templates and tools are designed for high engagement, ensuring your audience stays connected."
    },
    {
      name: "Fully Customizable",
      Icon: Leaf,
      Description: "Customize every element of your newsletters, from design to content, to perfectly match your brand."
    }
]


export default function CallToAction() {
  return (
    <section className="border-t border-gray-200 bg-gray-50">
    <MaxWidthWrapper className="py-20">
        <div className="grid grid-cols-1 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap:y-0">
            {features.map((park) => {
              const {name, Icon, Description} = park;
              return (
                <div key={name} className="text-center md:flex md:items-center lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                        {<Icon className="w-1/3 h-1/3" />}
                    </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">{name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{Description}</p>
                </div>
            </div>
            
              )
            })}
        </div>
    </MaxWidthWrapper>
  </section>
  )
}