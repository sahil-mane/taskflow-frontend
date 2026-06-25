import { useEffect, useRef, useState } from "react";
import CrossIcon from "../../assets/cross.svg?react"
import PlusIcon from "../../assets/Plus.svg?react"

const TaskModal = ({ task, onSave, onClose }) => {
	const [title, setTitle] = useState(task?.title || "");
	const [desc, setDesc] = useState(task?.description || "");
	const [status, setStatus] = useState(task?.status || "pending");
	const [priority, setPriority] = useState(task?.priority || "medium");
	const [titleErr, setTitleErr] = useState(false);
	const titleRef = useRef(null);

	useEffect(() => { titleRef.current?.focus(); }, []);

	const handleSave = () => {
		if (!title.trim()) { setTitleErr(true); titleRef.current?.focus(); return; }
		onSave({ title: title?.trim(), description: desc?.trim(), status, priority });
	};

	const handleKey = (e) => { if (e.key === "Enter" && e.target === titleRef.current) handleSave(); };

	useEffect(() => {
		setTitle(task?.title || "");
		setDesc(task?.description || "");
		setStatus(task?.status || "pending");
		setPriority(task?.priority || "medium");

		titleRef.current?.focus();
	}, [task]);

	return (
		<div
			className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[200]"
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-[slideUp_0.18s_ease]"
				onClick={(e) => e.stopPropagation()}>

				{/* Header */}
				<div className="flex items-center justify-between px-6 pt-5">
					<h2 className="text-base font-bold text-gray-900">
						{task ? "Edit task" : "New task"}
					</h2>
					<button
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200
                       text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm transition-all"
					>
						<CrossIcon />
					</button>
				</div>

				{/* Body */}
				<div className="px-6 py-5 space-y-4">
					<div>
						<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
							Title <span className="text-red-400 normal-case font-normal">*</span>
						</label>
						<input
							ref={titleRef}
							value={title}
							onChange={(e) => { setTitle(e.target.value); setTitleErr(false); }}
							onKeyDown={handleKey}
							placeholder="What needs to be done?"
							maxLength={120}
							className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400
                          transition focus:outline-none focus:ring focus:ring-violet-600/10
                          ${titleErr ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-violet-400"}`}
						/>
					</div>

					<div>
						<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
							Description <span className="text-gray-300 font-normal normal-case">(optional)</span>
						</label>
						<textarea
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							rows={3}
							placeholder="Add more details..."
							className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900
                         placeholder-gray-400 resize-y transition focus:outline-none focus:ring
                         focus:ring-violet-600/10 focus:border-violet-400"
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700
                           bg-white cursor-pointer appearance-none focus:outline-none focus:border-violet-400
                           focus:ring focus:ring-violet-600/10 transition"
							>
								<option value="pending">Pending</option>
								<option value="in_progress">In progress</option>
								<option value="completed">Completed</option>
							</select>
						</div>
						<div>
							<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Priority</label>
							<select
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
								className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700
                           bg-white cursor-pointer appearance-none focus:outline-none focus:border-violet-400
                           focus:ring focus:ring-violet-600/10 transition"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex gap-2.5 px-6 pb-5">
					<button
						onClick={onClose}
						className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200
                       rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="flex-[2] py-2.5 text-sm font-semibold text-white bg-violet-600
                       hover:bg-violet-800 rounded-lg shadow shadow-violet-600/25
                       hover:shadow-md transition-all active:scale-95 flex justify-center items-center gap-2"
					>
						{!task ? <PlusIcon /> : ""}
						{task ? "Save changes" : "Add task"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default TaskModal