import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Dropdown from '@/app/components/Animation/dropdown'; 

const DateDropdown = ({ selectedDate, setSelectedDate, setSelectedDropdown, navbar }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);
    console.log(navbar);
    useEffect(() => {
        const handleScroll = () => {
            if (!navbar) {
                if (window.scrollY > 300) {
                    if (isOpen) {
                        setIsOpen(!isOpen);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);


    const options = [
        { label: "Today", value: new Date() },
        { label: "Yesterday", value: new Date(new Date().setDate(new Date().getDate() - 1)) },
        { label: "Realtime", value: null }, // Bu değeri isteklerinize göre ayarlayabilirsiniz
        { label: "Last 7 Days", value: new Date(new Date().setDate(new Date().getDate() - 7)) },
        { label: "Last 30 Days", value: new Date(new Date().setDate(new Date().getDate() - 30)) },
        { label: "Last Month", value: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
        { label: "Last 12 Months", value: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) },
        { label: "All Time", value: null }, // Burayı isteğinize göre özelleştirin
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
                className="bg-main text-stone-900 font-medium px-4 py-2 rounded-lg inline-flex items-center w-full justify-between"
            >
                <span>
                    {options.find(opt => opt.value && isSameDay(opt.value, selectedDate))?.label || "Custom Date"}
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
                                        setSelectedDate(option.value);
                                        setSelectedDropdown(option.label); 
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
