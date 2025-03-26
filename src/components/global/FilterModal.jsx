import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import CalendarField from "./CalendarField";

const FilterModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("Nov, 15 2024");

  // Function to toggle first modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    // setIsModalOpenSecond(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const button = document.getElementById("filter-button");
      if (button) {
        const rect = button.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 10,
          left: rect.left + window.scrollX,
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-white shadow-lg rounded-xl  p-4 w-80 top-36 right-10"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-md font-semibold">Filter</h2>
        <button
          onClick={onClose}
          className="text-gray-500 border rounded-md border-[#989898] hover:text-gray-700 dark:hover:text-black"
        >
          <IoMdClose size={20} />
        </button>
      </div>

      {/* Date Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4 border-t pt-2">
        <div>
          <label className="text-sm font-medium">Start Date</label>
          <CalendarField
            toggleModal={toggleModal}
            selectedDate={selectedDate}
            isModalOpen={isModalOpen}
            handleDateClick={handleDateClick}
            // right={true}
          />
          {/* <div className="relative mt-1">
            <input
              type="text"
              placeholder="Select Date"
              className="w-full p-2 border rounded-lg pr-10" // Added pr-10 for padding on the right
              readOnly
            />
            <SlCalender
              className="absolute right-2 top-3 text-gray-500" // Position the icon to the right
              size={16}
            />
          </div> */}
        </div>
        <div>
          <label className="text-sm font-medium">End Date</label>
          <CalendarField
            toggleModal={toggleModal}
            selectedDate={selectedDate}
            isModalOpen={isModalOpen}
            handleDateClick={handleDateClick}
            // right={true}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button className="w-1/2 px-4 py-2 bg-gray-300  text-gray-700 dark:text-white rounded-lg">
          Clear
        </button>
        <button className="w-1/2 px-4 py-2 bg-[#5BAFEB] text-white rounded-lg">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
