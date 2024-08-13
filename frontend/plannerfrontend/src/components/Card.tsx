import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CardOptionDropdown from "./CardOptionDropdown";

import { useState, useRef, useEffect } from "react";
import { deleteTicket } from "./ApiService";

function Card({ data, onDelete }) {
  // Date Formatter
  const dateString = data.created_on;
  const date = new Date(dateString);

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Priority Logic
  const getPriorityIcon = () => {
    switch (data.priority) {
      case "Very Low":
        return <KeyboardDoubleArrowDownIcon sx={{ color: "#88F7E2" }} />; // Very Low
      case "Low":
        return <KeyboardArrowDownIcon sx={{ color: "#44D492" }} />; // Low
      case "Medium":
        return <UnfoldMoreIcon sx={{ color: "#F5EB67" }} />; // Medium
      case "High":
        return <KeyboardArrowUpIcon sx={{ color: "#FFA15C" }} />; // High
      case "Very High":
        return <KeyboardDoubleArrowUpIcon sx={{ color: "#FA233E" }} />; // Very High
      default:
        return null;
    }
  };

  // Dropdown options logix
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownVisible(false);
      setIsButtonSelected(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  // Delete handler
  const handleDelete = async () => {
    try {
      await onDelete(data.id); // Call the delete handler from props
      setIsDropdownVisible(false); // Close the dropdown after deletion
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  };

  //HTML

  return (
    <div className="w-[284px] flex flex-col justify-start items-start gap-[8px] p-[16px] rounded-[8px] shadow-sm border border-[#ddd] bg-white">
      <div className="flex w-full justify-between justify-items-center">
        <span className="flex-grow-0 font-sans text-[16px] font-semibold text-left text-[#212121] overflow-hidden text-ellipsis whitespace-nowrap">
          {" "}
          {data.title}{" "}
        </span>
        <div className=" relative ">
          <div
            ref={buttonRef}
            className="rounded-[5px] hover:bg-[#f3f3f3] active:bg-[#f3f3f3] focus:bg-[#f3f3f3] cursor-pointer"
            onClick={toggleDropdown}
          >
            <MoreHorizIcon sx={{ color: "#B4B6B9" }} />
          </div>
          <div ref={dropdownRef} className="absolute">
            {isDropdownVisible && (
              <CardOptionDropdown onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
      <div>
        <span className=" self-stretch flex-grow-0 font-sans text-[14px] text-left text-[#5a5a65] line-clamp-3">
          {" "}
          {data.description}{" "}
        </span>
      </div>
      <div className=" w-[252px] flex flex-row justify-between">
        <div className="flex items-center">
          <DateRangeIcon sx={{ color: "#B4B6B9" }} />
          <span className="font-sans text-[14px] ml-1 text-[#5a5a65]">
            {formattedDate}
          </span>
        </div>
        <div className="font-sans text-[14px]">{getPriorityIcon()}</div>
      </div>
    </div>
  );
}

export default Card;
