"use client"
import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Dropdown from '@/app/components/Animation/dropdown';
import { useDispatch } from 'react-redux';
import { setDropdown, setFirstDate, setLastDate, setRange } from '@/lib/redux/features/dateSettings/dateSlice';
import { useAppSelector } from '@/lib/redux/hooks';


const DateDropdown = ({ navbar, clw }) => {
    const [isOpen, setIsOpen] = useState(false);


    const dispatch = useDispatch()
    const lastDate = new Date(useAppSelector((state) => state.dateSettings.lastDate))
    const firstDate = new Date(useAppSelector((state) => state.dateSettings.firstDate))
    const dropdown = new Date(useAppSelector((state) => state.dateSettings.dropdown))
    const [dateTime, setDateTime] = useState("Today");

    useEffect(() => {
        // console.log("🚀 ~ useEffect ~ firstDate:", firstDate)
        // console.log("🚀 ~ useEffect ~ lastDate:", lastDate)
        if (firstDate == null) {
            setDateTime(options.find(opt => opt.value && isSameDay(opt.value, lastDate))?.label || "Custom Date");
        } else {
            setDateTime(options.find(opt => opt.value && isSameDay(opt.value, lastDate))?.label || "Custom Date");
        }
    }, [firstDate, lastDate]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                if (!navbar && window.scrollY > 300 && isOpen) {
                    setIsOpen(false);
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isOpen, navbar]);


    const options = [
        { label: "Today", value: new Date(), range: false },
        { label: "Yesterday", value: new Date(new Date().setDate(new Date().getDate() - 1)), range: false },
        //{ label: "Realtime", value: null },
        { label: "Last 7 Days", value: new Date(new Date().setDate(new Date().getDate() - 7)), range: true },
        { label: "Last 30 Days", value: new Date(new Date().setDate(new Date().getDate() - 30)), range: true },
        { label: "Last Month", value: new Date(new Date().setMonth(new Date().getMonth() - 1)), range: true },
        { label: "Last 12 Months", value: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), range: true },
        { label: "All Time", value: null },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const isSameDay = (date1, date2) => {

        return (
            date1?.getFullYear() === date2?.getFullYear() &&
            date1?.getMonth() === date2?.getMonth() &&
            date1?.getDate() === date2?.getDate()
        );
    };



    return (
        <div className="relative inline-block w-full font-dosis text-lg">
            <button
                onClick={toggleDropdown}
                className={`${clw} bg-main text-stone-900 font-medium px-4 py-2 rounded-lg inline-flex items-center w-full justify-between`}
            >
                <span>
                    { dateTime }
                </span>
                <FiChevronDown className="text-lg" />

            </button>

            <Dropdown isOpen={isOpen} classw="w-full h-full absolute top-16 z-20">
                {isOpen && (
                    <ul className=" text-stone-900 mt-2  bg-main w-full rounded-md overflow-hidden border border-stone-900/20 shadow-xl">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer text-primaryGray hover:bg-black/10 hover:text-stone-900 transition-all flex justify-between"
                                onClick={() => {
                                    if (option.value) {
                                        //setSelectedDate(option.value);
                                        //dispatch(setLastDate(new Date(option.value).toISOString()));
                                        if (option.range) {

                                            
                                            dispatch(setRange(option.range));
                                            dispatch(setFirstDate(new Date(option.value).toISOString()));
                                            dispatch(setLastDate(new Date().toISOString()));
                                        } else {
                                            dispatch(setRange(option.range));
                                            dispatch(setFirstDate(null));
                                            dispatch(setLastDate(new Date(option.value).toISOString()));
                                        }

                                        dispatch(setDropdown(option.label))
                                    }
                                    toggleDropdown();
                                }}
                            >
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </Dropdown>
        </div>
    );
};

export default DateDropdown;