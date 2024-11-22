import React from "react";
import { ArrowUp } from "lucide-react";

type Props = {
    subscribers: number | null;
    openRate: number;
    clickRate: number;
};

export default function DashboardOverviewCard({ subscribers, openRate, clickRate }: Props) {
    return (
        <div className="w-full flex flex-wrap md:flex-nowrap bg-white border rounded">
            {/* Subscribers */}
            <div className="w-full md:w-[33.33%] border-r p-5 text-lg">
                <h5 className="text-lg">Subscribers</h5>
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium pt-2">{subscribers !== null ? subscribers : "..."}</span>
                    <div className="h-[30px] flex p-2 items-center bg-[#dcfce6] rounded-full">
                        <span className="text-[#21c55d]">
                            <ArrowUp />
                        </span>
                        <span className="text-sm pl-1">100%</span>
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
