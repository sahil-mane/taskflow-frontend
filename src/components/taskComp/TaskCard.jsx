import { useEffect, useRef, useState } from "react";
import EditIcon from "../../assets/Edit.svg?react"
import TrashIcon from "../../assets/Trash.svg?react"
import DownArrow from "../../assets/down_arrow.svg?react"

const BORDER_COLOR = {
  pending: "border-l-amber-500",
  in_progress: "border-l-violet-600",
  completed: "border-l-green-600",
};

const BADGE_CLASS = {
  pending: "bg-amber-50 text-amber-800 border border-amber-200",
  in_progress: "bg-violet-50 text-violet-800 border border-violet-200",
  completed: "bg-green-50  text-green-800  border border-green-200",
};

const STATUS_LABEL = { pending: "Pending", in_progress: "In progress", completed: "Completed" };
const PRIORITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

const DOT_COLOR = { high: "bg-red-400", medium: "bg-amber-400", low: "bg-green-500" };

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  return (
    <div className={`bg-white border border-gray-100 border-l-4 ${BORDER_COLOR[task.status]}
                     rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-px
                     transition-all duration-150`}>
      {/* Title row */}
      <div className="pl-1">
        <div className="flex flex-wrap md:items-start gap-2 mb-1">
          <span className={`text-sm font-semibold leading-snug break-words flex-1
                            ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}>
            {task.title}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full
                            text-[11px] font-semibold uppercase tracking-wide ${BADGE_CLASS[task.status]}`}>
            {STATUS_LABEL[task.status]}
          </span>
        </div>
        {task.description && (
          <p className="text-xs text-gray-400 leading-relaxed mb-2 mt-0.5">{task.description}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 pt-3 border-t border-gray-100 gap-3">

        {/* Meta */}
        <div className="flex items-center justify-between sm:justify-start gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <i className="ti ti-calendar text-xs" />
            {fmt(task.createdAt)}
          </span>

          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span
              className={`w-2 h-2 rounded-full ${DOT_COLOR[task.priority]}`}
            />
            {PRIORITY_LABEL[task.priority]} priority
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1.5">
          <div className="relative" ref={selectRef}>
            <select
              value={task.status}
              onMouseDown={() => setIsOpen(!isOpen)}
              onBlur={() => setIsOpen(false)}
              onChange={(e) => {
                onStatusChange(task._id, e.target.value);
                setIsOpen(false);
              }}
              className="text-[11px] font-medium text-gray-500 border border-gray-200 rounded-md
               px-2 py-1 pr-7 bg-gray-50 hover:border-violet-400 transition
               cursor-pointer appearance-none focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>

            <DownArrow
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3
      text-gray-700 pointer-events-none transition-transform duration-200
      ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
          <button
            onClick={() => onEdit(task)}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg
                 text-gray-400 text-sm hover:bg-gray-50 hover:border-gray-300
                 hover:text-gray-700 transition-all"
          >
            <EditIcon />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg
                 text-gray-400 text-sm hover:bg-red-50 hover:border-red-200
                 hover:text-red-500 transition-all"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;