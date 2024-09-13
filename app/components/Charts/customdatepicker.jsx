/* eslint-disable no-unused-vars */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { format, isToday } from "date-fns";
import { useEffect, useState } from "react";

const CustomDatePicker = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const [selectRange, setSelectRange] = useState(new Date())
  
    useEffect(() => {
        setSelectRange(new Date())
    }, [selectedDropdown])

    const Dropdownfunc = (date) => {
        if (date == "Last 7 Days") {
            return true
        } else if (date == "Last 30 Days") { return true }
        else if (date == "Last Month") { return true }
        else if (date == "Last 12 Months") { return true }
        else { return false }
      
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleRangeChange = (date) => {
        setSelectRange(date);
    };

    const handlePrevDay = () => {
        setSelectedDate((prev) => {
            const newDate = new Date(prev); // Yeni bir tarih oluştur
            newDate.setDate(prev.getDate() - 1); // Bir gün geri git
            return newDate;
        });
    };

    const handleNextDay = () => {
        setSelectedDate((prev) => {
            const newDate = new Date(prev); // Yeni bir tarih oluştur
            newDate.setDate(prev.getDate() + 1); // Bir gün ileri git
            return newDate;
        });
    };

    return (
        <div className="w-full lg:px-8 px-3 py-6 flex items-center justify-between">
            <div
                className="w-9 h-9 cursor-pointer bg-primaryGray/10 hover:bg-primaryGray/20 transition-all text-primary border border-primary rounded-md flex items-center justify-center text-3xl"
                onClick={handlePrevDay}
            >
                <RxCaretLeft />
            </div>
            <div className="w-full flex flex-col items-center justify-center">


                {
                    Dropdownfunc(selectedDropdown) ? (
                        <div className="w-full flex items-center justify-center gap-2">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="EEE, dd MMM"
                                customInput={
                                    <div className="font-dosis text-1-5xl cursor-pointer">
                                        {isToday(selectedDate) ? "= Today =" : `= ${format(selectedDate, "EEE, dd MMM")}`}

                                    </div>
                                }

                            />
                            <div className="w-fit h-full flex items-center justify-center">-</div>
                            <DatePicker
                                selected={selectRange}
                                onChange={handleRangeChange}
                                dateFormat="EEE, dd MMM"
                                customInput={
                                    <div className="font-dosis text-1-5xl cursor-pointer">
                                        {isToday(selectedDate) ? "= Today =" : `${format(selectRange, "EEE, dd MMM")} =`}

                                    </div>
                                }

                            />
                        </div>
                    ) : (<DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="EEE, dd MMM"
                        customInput={
                            <div className="font-dosis text-1-5xl cursor-pointer">
                                {isToday(selectedDate) ? "= Today =" : `= ${format(selectedDate, "EEE, dd MMM")} =`}

                            </div>
                        }

                    />)
                }


                <hr className="lg:w-4/6 w-5/6 mx-auto border-b-2 border-secondary/20 mt-2" />

            </div>
            <div
                className="w-9 h-9 cursor-pointer bg-primaryGray/10 hover:bg-primaryGray/20 transition-all text-primary border border-primary rounded-md flex items-center justify-center text-3xl"
                onClick={handleNextDay}
            >
                <RxCaretRight />
            </div>
        </div>
    );
};

export default CustomDatePicker;
