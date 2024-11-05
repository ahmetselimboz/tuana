import { cn } from "@/lib/utils";
import {
    IconActivity,
    IconAdjustmentsBolt,
    IconCalendarStats,
    IconClock,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconPlug,
    IconReportAnalytics,
    IconRouteAltLeft,
    IconTarget,
    IconTerminal2,
    IconTrendingUp,
} from "@tabler/icons-react";

import ScaleUpOnScroll from "./ScaleUpOnScroll";

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Real-Time User Tracking",
            description:
                "Users' actions on the website or application are instantly tracked and converted into data.",
            icon: <IconActivity />, // Real-time activity tracking
        },
        {
            title: "Numerical and Graphical Analyses",
            description:
                "The collected data is presented to businesses with meaningful and easy-to-understand numerical and graphical analysis.",
            icon: <IconRouteAltLeft />, // Chart representation for data analysis
        },
        {
            title: "Comprehensive Historical Data Filters",
            description:
                "Analyses can be made on the past behavior of users. Analyses can be filtered by today, yesterday or a specific date range.",
            icon: <IconCalendarStats />, // Historical data filtering
        },
        {
            title: "User Time Zone Support",
            description:
                "Collects and analyzes data based on each user's time zone, providing more accurate results for global businesses.",
            icon: <IconClock />, // Time zone support
        },
        {
            title: "User Experience Optimization Recommendations",
            description:
                "The platform identifies pain points in the customer journey and provides recommendations for improvement in these areas.",
            icon: <IconTarget />, // Optimization and improvement recommendations
        },
        {
            title: "Easy Integration",
            description:
                "It offers an infrastructure that can be easily integrated into websites or applications, thus enabling a fast installation process.",
            icon: <IconPlug />, // Integration support
        },
        {
            title: "Support for Data-Driven Strategic Decisions",
            description:
                "Tuana enables businesses to derive value from customer behavior and make strategic decisions with this data.",
            icon: <IconTrendingUp />, // Data-driven strategic decisions
        },
        {
            title: "Customizable Reporting",
            description:
                "It offers detailed reporting options that can be tailored to the needs of businesses, thus enabling them to achieve analysis in line with specific goals and KPIs.",
            icon: <IconReportAnalytics />, // Customizable reporting
        },
    ];
    
    return (
        (<div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-4 px-16 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <ScaleUpOnScroll key={feature.title}>
                    <Feature key={feature.title} {...feature} index={index} />
                </ScaleUpOnScroll>

            ))}
        </div>)
    );
}

const Feature = ({
    title,
    description,
    icon,
    index
}) => {
    return (
        (<div
            className={cn(
                "flex flex-col lg:border-r border-primary/20 py-10 relative group/feature dark:border-neutral-800 h-full",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}>
            {index < 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/20 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/20 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div
                className="mb-4 relative z-10 px-10 text-primaryGray dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div
                    className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                <span
                    className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-primaryGray dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p
                className="text-sm text-primaryGray dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>)
    );
};
