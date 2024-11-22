import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is imported from your UI components
import { twMerge } from "tailwind-merge"; // Assuming tailwind-merge is used
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react"; // Assuming you are using HeroIcons

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false); // State to track whether monthly or yearly is selected

    const pricingTiers = [
        {
            title: "Starter",
            monthlyPrice: 0,
            yearlyPrice: 0, // Add yearly price here if needed
            buttonText: "Get started for free",
            link: "/sign-in",
            popular: false,
            inverse: false,
            features: [
                "Up to 500 subscribers",
                "Unlimited newsletters",
                "Basic email templates",
                "Basic analytics",
                "Standard support",
            ],
        },
        {
            title: "Professional",
            monthlyPrice: 1500,
            yearlyPrice: 15000, // Example yearly price
            buttonText: "Sign up now",
            link: "https://paystack.com/pay/7x37oasxr6",
            popular: true,
            inverse: true,
            features: [
                "Up to 5,000 subscribers",
                "Unlimited newsletters",
                "Customizable templates",
                "Advanced analytics",
                "Priority support",
                "Advanced integrations",
                "A/B testing",
            ],
        },
        {
            title: "Enterprise",
            monthlyPrice: 3000,
            yearlyPrice: 30000, // Example yearly price
            buttonText: "Sign up now",
            link: "https://paystack.com/pay/x3-pi23nqk",
            popular: false,
            inverse: false,
            features: [
                "Up to 50,000 subscribers",
                "Unlimited newsletters",
                "Custom templates with branding",
                "Dedicated account manager",
                "Advanced segmentation and targeting",
                "Dedicated IP address",
                "Advanced analytics and reporting",
                "Full API access",
                "24/7 premium support",
                "Advanced security features",
            ],
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto">

                {/* Toggle Button for switching between Monthly and Yearly */}
                <div className="mt-8 text-right">
                    <Button
                        onClick={() => setIsYearly(!isYearly)}
                        className="border px-6 py-2 rounded-lg"
                    >
                        {isYearly ? "Switch to Monthly" : "Switch to Yearly"}
                    </Button>
                </div>

                <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
                    {pricingTiers.map((price) => (
                        <div
                            className={twMerge(
                                "p-10 max-w-xs w-full border border-[#f1f1f1] rounded-3xl shadow-[0_7px_14px_#EAEAEAEA]",
                                price.inverse === true && "border-black bg-black text-white"
                            )}
                            key={price.title}
                        >
                            <div className="flex justify-between">
                                <h3
                                    className={twMerge(
                                        "font-bold text-lg text-black/50",
                                        price.inverse === true && "text-white/60"
                                    )}
                                >
                                    {price.title}
                                </h3>
                                {price.popular && (
                                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                                        <motion.span
                                            animate={{
                                                backgroundPositionX: "100%",
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                ease: "linear",
                                                repeatType: "loop",
                                                duration: 1,
                                            }}
                                            className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-medium text-transparent bg-clip-text"
                                        >
                                            Popular
                                        </motion.span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-baseline gap-1 mt-[30px]">
                                <span className="text-4xl font-bold tracking-tighter leading-none">
                                ₦{isYearly ? price.monthlyPrice * 12 : price.monthlyPrice}
                                </span>
                                <span className="tracking-tight font-bold text-black/50">
                                    /{isYearly ? "year" : "month"}
                                </span>
                            </div>
                            <Button
    onClick={() => {
        window.location.href = price.link;  // Navigate to the link
    }}
    className={twMerge(
        "w-full mt-[30px]",
        price.inverse === true && "bg-white text-black hover:text-white"
    )}
>
    {price.buttonText}
</Button>
                            <ul className="flex flex-col gap-5 mt-[32px]">
                                {price.features.map((feature) => (
                                    <li className="text-sm flex items-center gap-4" key={feature}>
                                        <span>
                                            <CheckIcon />
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
