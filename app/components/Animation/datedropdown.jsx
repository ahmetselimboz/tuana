"use client";

import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Dropdown from "@/app/components/Animation/dropdown";
import { useDispatch } from "react-redux";
import { setDropdown, setFirstDate, setLastDate } from "@/lib/redux/features/dateSettings/dateSlice";
import { useAppSelector } from "@/lib/redux/hooks";

const DateDropdown = ({ navbar, clw }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const lastDate = new Date(useAppSelector((state) => state.dateSettings.lastDate));
    const userTimeZone = useAppSelector((state) => state.dateSettings.timezone);

    // Close dropdown on scroll if `navbar` is false
    useEffect(() => {
        if (typeof window !== "undefined" && !navbar) {
            const handleScroll = () => isOpen && window.scrollY > 300 && setIsOpen(false);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isOpen, navbar]);

    const options = [
        { label: "Today", value: new Date(), range: false },
        { label: "Yesterday", value: new Date().setDate(new Date().getDate() - 1), range: false },
        { label: "Realtime", value: null, range: false },
        { label: "Last 7 Days", value: new Date().setDate(new Date().getDate() - 7), range: true },
        { label: "Last 30 Days", value: new Date().setDate(new Date().getDate() - 30), range: true },
        { label: "Last Month", value: new Date().setMonth(new Date().getMonth() - 1), range: true },
        { label: "Last 12 Months", value: new Date().setFullYear(new Date().getFullYear() - 1), range: true },
        { label: "All Time", value: null, range: false },
    ];

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // Helper to check if two dates are the same day
    const isSameDay = (date1, date2) =>
        date1?.getFullYear() === date2?.getFullYear() &&
        date1?.getMonth() === date2?.getMonth() &&
        date1?.getDate() === date2?.getDate();

    // Find the label for the currently selected date or default to "Custom Date"
    const currentLabel = options.find((opt) => opt.value && isSameDay(new Date(opt.value), lastDate))?.label || "Custom Date";

    const handleOptionClick = (option) => {
        if (option.value) {
            // dispatch(setLastDate(new Date(option.value).toISOString()));
            // dispatch(setDropdown(option.label))
            if (option.range) {
                dispatch(setFirstDate(new Date(option.value).toISOString()));
                dispatch(setDropdown(option.label));
            }else{
                dispatch(setLastDate(new Date(option.value).toISOString()));
                dispatch(setFirstDate(null));
                dispatch(setDropdown(option.label));
            }


        }
        toggleDropdown();
    };

    return (
        <div className="relative inline-block w-full font-dosis text-lg">
            <button
                onClick={toggleDropdown}
                className={`${clw} bg-main text-stone-900 font-medium px-4 py-2 rounded-lg inline-flex items-center w-full justify-between`}
            >
                <span>{currentLabel}</span>
                <FiChevronDown className="text-lg" />
            </button>

            {isOpen && (
                <Dropdown isOpen={isOpen} classw="w-full h-full absolute top-16 z-20">
                    <ul className="text-stone-900 mt-2 bg-main w-full rounded-md overflow-hidden border border-stone-900/20 shadow-xl">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer text-primaryGray hover:bg-black/10 hover:text-stone-900 transition-all flex justify-between"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </Dropdown>
            )}
        </div>
    );
};

export default DateDropdown;
