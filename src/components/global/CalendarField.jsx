import React, { useState } from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { monthAbbreviations, monthNames } from "../global/dummyData";
import { SlCalender } from "react-icons/sl";

const CalendarField = ({
  toggleModal,
  selectedDate,
  isModalOpen,
  handleDateClick,
  right = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const years = [selectedYear, selectedYear + 1]; // Allow selecting 2 future years

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const formatDate = (month, day, year) => {
    return `${monthAbbreviations[month]}, ${day} ${year}`;
  };

  return (
    <>
      <div className="w-[130px] p-2 flex items-center gap-2 border border-black pr-1 pl-2  rounded-md text-white">
        <span className="text-sm text-black">{selectedDate}</span>
        <div className="text-black">
          <button className="text-black transition p-1" onClick={toggleModal}>
            <SlCalender size={14} />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div
          className={`absolute top-18 ${
            right ? "right-48" : "right-5"
          }  w-[336px] h-[350px] flex items-center justify-end rounded-[40px] bg-opacity-50 z-10`}
        >
          {/* <div
            className="bg-white bg-opacity-20 p-4 backdrop-blur-lg rounded-[20px] shadow-lg"
            
          > </div> */}

          <div
            className="bg-white text-black rounded-[18px] p-4 w-[315px]"
            style={{ width: "315px", height: "336px" }}
          >
            <div className="flex justify-between items-center text-black text-xl mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 hover:text-black"
              >
                <FaChevronLeft size={13} />
              </button>
              <div className="flex items-center gap-2 text-[16px]">
                <span>{monthNames[currentDate.getMonth()]}</span>
                <select
                  className="bg-transparent outline-none"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year} className="text-black">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:text-gray-300"
              >
                <FaChevronRight size={13} />
              </button>
            </div>

            <hr className=" border-b border-[#ffffff30] my-4" />

            <div className="grid grid-cols-7 gap-2 text-black">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <div key={day} className="text-center text-sm">
                  {day}
                </div>
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => (
                <button
                  type="button"
                  key={i}
                  className="py-2 px-3 text-sm rounded-full hover:bg-[#8171F9] transition"
                  onClick={() =>
                    handleDateClick(
                      formatDate(
                        monthNames[currentDate.getMonth()],
                        i + 1,
                        selectedYear
                      )
                    )
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarField;
