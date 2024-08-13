import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function CardOptionDropdown({ onDelete }) {
  return (
    <div className="border w-auto h-auto max-h-50 flex flex-col rounded-md p-2 cardoptions bg-[#ffffff]">
      <div className="flex items-center mb-2 hover:bg-[#b0b0b023] p-1 rounded-lg cursor-pointer">
        <EditOutlinedIcon
          style={{ fontSize: 16, color: "#5a5a65" }}
          className="mr-1"
        />
        <span className="font-sans text-[14px] text-[#5a5a65]">Edit</span>
      </div>
      <div
        className="flex items-center hover:bg-[#FFE2DD] p-1 rounded-lg cursor-pointer"
        onClick={onDelete}
      >
        <DeleteOutlinedIcon
          style={{ fontSize: 16, color: "#5a5a65" }}
          className="mr-1"
        />
        <span className="font-sans text-[14px] text-[#5a5a65] mr-1">
          Delete
        </span>
      </div>
    </div>
  );
}

export default CardOptionDropdown;
