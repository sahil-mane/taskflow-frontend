import React, { useEffect, useState } from 'react'
import Header from '../components/headers/Header';
import StatCard from '../components/taskComp/StatCard';
import FilterChip from '../components/taskComp/FilterChip';
import PlusIcon from '../assets/plus.svg?react';
import TaskCard from '../components/taskComp/TaskCard';
import TaskModal from '../components/modals/TaskModal';
import { useCreateTask, useDeleteTask, useGetTasks, useGetTaskStats, useUpdateTask } from '../api/task';
import { useInView } from "react-intersection-observer";
import ClipBoardIcon from "../assets/clipBoard.svg?react"
import { useQueryClient } from '@tanstack/react-query';
import DeleteModal from '../components/modals/DeleteModal';
import toast from 'react-hot-toast';

const TaskPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(null);

	const [filter, setFilter] = useState("all");
	const queryClient = useQueryClient()

	const handleEdit = (task) => {
		setEditingTask(task);
		setIsModalOpen(true);
	};

	const handleDeleteClick = (taskId) => {
		setSelectedTaskId(taskId);
		setIsDeleteModalOpen(true);
	};

	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useGetTasks({
		status: filter, // optional filter
	});

	const { data: statsData } =
		useGetTaskStats();

	const { mutate: updateTask } = useUpdateTask();

	const { mutate: deleteTask } = useDeleteTask();

	const { mutate: createTask } = useCreateTask()

	const handleStatusChange = (
		taskId,
		status
	) => {
		updateTask({
			taskIds: [taskId],
			status,
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["task-stats"],
				});

				queryClient.invalidateQueries({
					queryKey: ["tasks"],
				});

			},
			onError: (error) => {
				console.log(error);
			},
		});
	};

	const handleDeleteConfirm = () => {
		deleteTask(
			{
				taskIds: [selectedTaskId],
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["task-stats"],
					});

					queryClient.invalidateQueries({
						queryKey: ["tasks"],
					});

					toast.success("Delete task Successfully")
					setIsDeleteModalOpen(false);
					setSelectedTaskId(null);
				},
			}
		);
	};

	const handleSaveTask = (formData) => {
		if (editingTask) {
			// Update
			updateTask(
				{
					taskIds: [editingTask._id],
					...formData,
				},
				{
					onSuccess: () => {
						toast.success("Task updated successfully");

						queryClient.invalidateQueries({
							queryKey: ["task-stats"],
						});

						queryClient.invalidateQueries({
							queryKey: ["tasks"],
						});

						setIsModalOpen(false);
						setEditingTask(null);
					},
				}
			);
		} else {
			// Create Task API
			createTask(formData, {
				onSuccess: () => {
					toast.success("Task created successfully");

					queryClient.invalidateQueries({
						queryKey: ["task-stats"],
					});

					queryClient.invalidateQueries({
						queryKey: ["tasks"],
					});


					setIsModalOpen(false);
				},
			});
		}
	};

	const stats = statsData?.data || {};

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	const tasks = data?.pages?.flatMap((page) => page?.data?.tasks || []) || [];

	if (isLoading) { return <div>Loading...</div>; } if (isError) { return <div>Something went wrong</div>; }



	const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Header />
			<main className="flex-1 max-w-4xl mx-auto w-full px-5 py-6">

				{/* Page header */}
				<div className="mb-5">
					<h1 className="text-xl font-bold text-gray-900 tracking-tight">My tasks</h1>
					<p className="text-xs text-gray-400 mt-0.5">{today}</p>
				</div>

				{/* Stats grid */}
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
					<StatCard icon="layout-list" count={stats?.total || 0}
						label="Total" borderColor="border-l-blue-500" />
					<StatCard icon="clock" count={stats.pending}
						label="Pending" borderColor="border-l-amber-500" />
					<StatCard icon="loader" count={stats.inProgress}
						label="In progress" borderColor="border-l-violet-600" />
					<StatCard icon="circle-check" count={stats.completed}
						label="Completed"  borderColor="border-l-green-500" />
				</div>

				{/* Toolbar */}
				<div className="flex flex-wrap items-center gap-2 mb-4">
					<div className="flex flex-wrap gap-1.5">
						{[
							{ label: "All", filter: "all" },
							{ label: "Pending", filter: "pending" },
							{ label: "In Progress", filter: "in_progress" },
							{ label: "Completed", filter: "completed" },
						].map(({ label, filter: f }) => (
							<FilterChip key={f} label={label} filter={f}
								active={filter === f}
								onClick={() => setFilter(f)} />
						))}
					</div>
					<button
						onClick={() => {
							setEditingTask(null);
							setIsModalOpen(true);
						}}
						className="hidden sm:flex ml-auto items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-800 text-white text-sm font-semibold rounded-lg shadow shadow-violet-600/25"
					>
						<PlusIcon />
						<span>Add task</span>
					</button>
					{/* Mobile FAB */}
					<button
						onClick={() => {
							setEditingTask(null);
							setIsModalOpen(true);
						}}
						className="sm:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg"
					>
						<PlusIcon />
					</button>
				</div>

				{/* Task list */}
				<div className="flex flex-col gap-2.5">
					{tasks.length === 0 ? (
						<div className="text-center py-16">
							<div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center
                              text-violet-400 text-3xl mx-auto mb-4">
								<ClipBoardIcon />
							</div>
							<p className="text-sm font-semibold text-gray-500 mb-1">
								{`No tasks ${filter !== "In progress" ? `in ${filter}` : filter}`}
							</p>
							<p className="text-xs text-gray-400">
								{/* {filter === "all" ? 'Click "Add task" to get started.' : "Try a different filter."} */}
							</p>
						</div>
					) : (
						tasks.map(task => (
							<TaskCard
								key={task.id}
								task={task}
								onEdit={handleEdit}
								onDelete={handleDeleteClick}
								onStatusChange={handleStatusChange}
							/>
						))
					)}
					<div ref={ref} className="py-5 text-center">
						{isFetchingNextPage && (
							<p>Loading more tasks...</p>
						)}
					</div>
				</div>
			</main>
			{isModalOpen && (
				<TaskModal
					task={editingTask}
					onSave={handleSaveTask}
					onClose={() => {
						setIsModalOpen(false);
						setEditingTask(null);
					}}
				/>
			)}
			{isDeleteModalOpen && (
				<DeleteModal
					onConfirm={handleDeleteConfirm}
					onClose={() => {
						setIsDeleteModalOpen(false);
						setSelectedTaskId(null);
					}}
				/>
			)}
		</div>
	)
}

export default TaskPage
