/* eslint-disable no-unused-vars */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { format, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { setFirstDate, setLastDate } from "@/lib/redux/features/dateSettings/dateSlice";
import { useDispatch } from "react-redux";


const CustomDatePicker = () => {

    //const [firstDate, setfirstDate] = useState(new Date())
    const dispatch = useDispatch()
    const lastDate = new Date(useAppSelector((state) => state.dateSettings.lastDate))
    const firstDate = new Date(useAppSelector((state) => state.dateSettings.firstDate))
    const selectedDropdown = useAppSelector((state) => state.dateSettings.dropdown)

    // useEffect(() => {

    //     if (Dropdownfunc(selectedDropdown)) {
    //         dispatch(setFirstDate(new Date().toISOString()))
    //     } else {
    //         dispatch(setFirstDate(null))
    //     }
    // }, [firstDate])

    const Dropdownfunc = (date) => {
        if (date == "Last 7 Days") {

            return true
        } else if (date == "Last 30 Days") { return true }
        else if (date == "Last Month") { return true }
        else if (date == "Last 12 Months") { return true }
        else { return false }

    }

    const handleDateChange = (date) => {
        dispatch(setLastDate(date))

    };
    const handleRangeChange = (date) => {

        dispatch(setFirstDate(date))

    };

    const handlePrevDay = () => {
        const newDate = new Date(lastDate);
        newDate.setDate(lastDate.getDate() - 1);
        dispatch(setLastDate(new Date(newDate).toISOString()))

    };

    const handleNextDay = () => {
        const newDate = new Date(lastDate);
        newDate.setDate(lastDate.getDate() + 1);
        dispatch(setLastDate(new Date(newDate).toISOString()))
    };

    return (

        <>
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
                                selected={firstDate}
                                onChange={handleDateChange}
                                dateFormat="EEE, dd MMM"
                                maxDate={new Date()}
                                customInput={
                                    <div className="font-dosis text-1-5xl cursor-pointer">
                                        {`=${format(firstDate, "EEE, dd MMM")}`}

                                    </div>
                                }

                            />
                            <div className="w-fit h-full flex items-center justify-center">-</div>
                            <DatePicker
                                selected={lastDate}
                                onChange={handleRangeChange}
                                dateFormat="EEE, dd MMM"
                                maxDate={new Date()}
                                customInput={
                                    <div className="font-dosis text-1-5xl cursor-pointer">
                                        {`${format(lastDate, "EEE, dd MMM")} =`}

                                    </div>
                                }

                            />
                        </div>
                    ) : (<DatePicker
                        selected={lastDate}
                        onChange={handleDateChange}
                        dateFormat="EEE, dd MMM"
                        maxDate={new Date()}
                        customInput={
                            <div className="font-dosis text-1-5xl cursor-pointer">
                                {isToday(lastDate) ? "= Today =" : `= ${format(lastDate, "EEE, dd MMM")} =`}

                            </div>
                        }

                    />)
                }


                <hr className="lg:w-4/6 w-5/6 mx-auto border-b-2 border-secondary/20 mt-2" />

            </div>
            {isToday(lastDate) ?
                (
                    <div></div>
                )
                : (
                    <div
                        className="w-9 h-9 cursor-pointer bg-primaryGray/10 hover:bg-primaryGray/20 transition-all text-primary border border-primary rounded-md flex items-center justify-center text-3xl"
                        onClick={handleNextDay}
                    >
                        <RxCaretRight />
                    </div>
                )}

        </>
    );
};

export default CustomDatePicker;