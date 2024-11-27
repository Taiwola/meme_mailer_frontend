'use client'
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { fetchSubscriberCount } from "@/app/hook/use-analytics";

type Props = {
    openRate: number;
    clickRate: number;
};

export default function DashboardOverviewCard({ openRate, clickRate }: Props) {
    const [subscriber, setSubscriber] = useState<number>();
    const [subPer, setSubPer] = useState<number>();
    useEffect(() => {
        const fetch = async () => {
          const subscriber = await fetchSubscriberCount();
          const lastMonthSubscriber = subscriber[subscriber.length - 1];
          const previousLastMonthSubscribers = subscriber[subscriber.length - 2];
          let comparePer = 0;
          if (previousLastMonthSubscribers.count > 0) {
              comparePer = ((lastMonthSubscriber.count - previousLastMonthSubscribers.count) / previousLastMonthSubscribers.count) * 100;
          } else {
            comparePer = 100
          }
          setSubPer(comparePer);
          setSubscriber(lastMonthSubscriber.count);
        }
        fetch()
      },[]);
    return (
        <div className="w-full flex flex-wrap md:flex-nowrap bg-white border rounded">
            {/* Subscribers */}
            <div className="w-full md:w-[33.33%] border-r p-5 text-lg">
                <h5 className="text-lg">Subscribers</h5>
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium pt-2">{subscriber !== null ? subscriber : "..."}</span>
                    <div className="h-[30px] flex p-2 items-center bg-[#dcfce6] rounded-full">
                        <span className="text-[#21c55d]">
                            <ArrowUp />
                        </span>
                        <span className="text-sm pl-1">{subPer}%</span>
                    </div>
                </div>
                <small className="block text-sm opacity-[.7] pt-2">from 0 (last 4 weeks)</small>
            </div>

            {/* Open Rate */}
            <div className="w-full md:w-[33.33%] border-r p-5 text-lg">
                <h5 className="text-lg">Open Rate</h5>
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium pt-2">{openRate}%</span>
                    <div className="h-[30px] flex p-2 items-center bg-gray-300 rounded-full">
                        <span className="text-gray-400">-</span>
                        <span className="text-sm pl-1">0%</span>
                    </div>
                </div>
                <small className="block text-sm opacity-[.7] pt-2">from 0 (last 4 weeks)</small>
            </div>

            {/* Click Rate */}
            <div className="w-full md:w-[33.33%] border-r p-5 text-lg">
                <h5 className="text-lg">Click Rate</h5>
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium pt-2">{clickRate}%</span>
                    <div className="h-[30px] flex p-2 items-center bg-gray-300 rounded-full">
                        <span className="text-gray-400">-</span>
                        <span className="text-sm pl-1">0%</span>
                    </div>
                </div>
                <small className="block text-sm opacity-[.7] pt-2">from 0 (last 4 weeks)</small>
            </div>
        </div>
    );
}
