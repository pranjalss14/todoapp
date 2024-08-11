import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

function Card({ data }) {
  return (
    <body className="p-2">
      <div className="w-[260px] h-[104px] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-2 flex justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">{data.title}</h2>
            <p className="text-gray-700 text-sm mb-2 text-ellipsis">
              {data.description}
            </p>
            <p>{data.description}</p>
            <p>Status: {data.status}</p>
            <p>Priority: {data.priority}</p>
            <p>Assignee: {data.assignee}</p>
          </div>
          <div>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </body>
  );
}

export default Card;
