/* eslint-disable no-unused-vars */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { format, isToday, addDays, subDays } from "date-fns";
import { useCallback } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { setFirstDate, setLastDate } from "@/lib/redux/features/dateSettings/dateSlice";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";

const CustomDatePicker = () => {
    const dispatch = useDispatch();

    const lastDate = new Date(useAppSelector((state) => state.dateSettings.lastDate));
    const firstDate = new Date(useAppSelector((state) => state.dateSettings.firstDate));
    const selectedDropdown = useAppSelector((state) => state.dateSettings.dropdown);


    const isRangeDropdown = useCallback((dropdown) => {
        return ["Last 7 Days", "Last 30 Days", "Last Month", "Last 12 Months"].includes(dropdown);
    }, []);

    // useEffect(() => {
    //     if (isRangeDropdown(selectedDropdown)) {
    //         dispatch(setLastDate(new Date().toISOString()));
    //     }
    // }, [selectedDropdown]);

    const handleDateChange = (date) => {
        dispatch(setLastDate(DateTime.fromJSDate(date.toISOString()).setZone(userTimeZone).toISO()));
    };

    const handleRangeChange = (date) => {
        dispatch(setFirstDate(DateTime.fromJSDate(date.toISOString()).setZone(userTimeZone).toISO()));
    };

    const handlePrevDay = () => {
        const newDate = subDays(lastDate, 1);
        dispatch(setLastDate(DateTime.fromJSDate(newDate.toISOString()).setZone(userTimeZone).toISO()));
    };

    const handleNextDay = () => {
        const newDate = addDays(lastDate, 1);
        dispatch(setLastDate(DateTime.fromJSDate(newDate.toISOString()).setZone(userTimeZone).toISO()));
    };

    return (
        <div className="flex w-full items-center gap-2">
            <div
                className="w-9 h-9 cursor-pointer bg-primaryGray/10 hover:bg-primaryGray/20 transition-all text-primary border border-primary rounded-md flex items-center justify-center text-3xl"
                onClick={handlePrevDay}
            >
                <RxCaretLeft />
            </div>
            <div className="flex w-full flex-col items-center">
                {isRangeDropdown(selectedDropdown) ? (
                    <div className="flex items-center gap-2">
                        <DatePicker
                            selected={lastDate}
                            onChange={handleDateChange}
                            dateFormat="EEE, dd MMM"
                            customInput={
                                <div className="font-dosis text-1-5xl cursor-pointer">
                                    {`= ${format(lastDate, "EEE, dd MMM")}`}
                                </div>
                            }
                        />
                        <span className="mx-1">-</span>
                        <DatePicker
                            selected={firstDate}
                            onChange={handleRangeChange}
                            dateFormat="EEE, dd MMM"
                            customInput={
                                <div className="font-dosis text-1-5xl cursor-pointer">
                                    {`${format(firstDate, "EEE, dd MMM")} =`}
                                </div>
                            }
                        />
                    </div>
                ) : (
                    <DatePicker
                        selected={lastDate}
                        onChange={handleDateChange}
                        dateFormat="EEE, dd MMM"
                        customInput={
                            <div className="font-dosis text-1-5xl cursor-pointer">
                                {isToday(lastDate) ? "= Today =" : `= ${format(lastDate, "EEE, dd MMM")} =`}
                            </div>
                        }
                    />
                )}
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
