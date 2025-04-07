import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import CalendarField from "./CalendarField";
import { formatDate } from "../../lib/helpers"; // Import the helper function

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select Date");
  const [selectedSecondDate, setSelectedSecondDate] = useState("Select Date");
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  // Function to toggle first modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
  };

  const toggleSecondModal = () => {
    setIsSecondModalOpen((prev) => !prev);
  };

  const handleSecondDateClick = (date) => {
    setSelectedSecondDate(date);
    setIsSecondModalOpen(false);
  };

  const handleClearClick = () => {
    setSelectedDate("Select Date");
    setSelectedSecondDate("Select Date");
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

  // Handle Apply button click
  const handleApplyClick = () => {
    // Use the helper function to format the selected dates
    const formattedStartDate = formatDate(selectedDate);
    const formattedEndDate = formatDate(selectedSecondDate);

    // Pass the formatted dates to the parent component
    onApply(formattedStartDate, formattedEndDate);
    onClose(); // Close the modal after applying the dates
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-white shadow-lg rounded-xl p-4 w-80 top-36 right-10"
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
          />
        </div>
        <div>
          <label className="text-sm font-medium">End Date</label>
          <CalendarField
            toggleModal={toggleSecondModal}
            selectedDate={selectedSecondDate}
            isModalOpen={isSecondModalOpen}
            handleDateClick={handleSecondDateClick}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          className="w-1/2 px-4 py-2 bg-gray-300 text-gray-700 dark:text-white rounded-lg"
          onClick={handleClearClick}
        >
          Clear
        </button>
        <button
          onClick={handleApplyClick} // Trigger the apply handler
          className="w-1/2 px-4 py-2 bg-[#5BAFEB] text-white rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
