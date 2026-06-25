import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const getTasksApi = async ({ pageParam = 1, queryKey }) => {
	const [, filters] = queryKey;

	const response = await apiClient.post("/api/tasks/getAllTasks", {
		...filters,
		page: pageParam,
		limit: 10,
	});

	return response.data;
};

export const useGetTasks = (data) => {
	return useInfiniteQuery({
		queryKey: ["tasks", data],
		queryFn: getTasksApi,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage?.data?.pagination?.page;
			const totalPages = lastPage?.data?.pagination?.totalPages;

			return currentPage < totalPages
				? currentPage + 1
				: undefined;
		},
		getPreviousPageParam: (firstPage) => {
			const currentPage = firstPage?.data?.pagination?.page;

			return currentPage > 1
				? currentPage - 1
				: undefined;
		},
	});
};

const createTaskApi = async (data) => {
	const response = await apiClient.post(
		"/api/tasks/createTask",
		data
	);

	return response.data;
};

export const useCreateTask = ()=>{
	return useMutation({
		mutationFn:createTaskApi
	})
}

const updateTaskApi = async (data) => {
	const response = await apiClient.put(
		"/api/tasks/updateTasks",
		data
	);

	return response.data;
};

export const useUpdateTask = () => {
	return useMutation({
		mutationFn: updateTaskApi,
	})
}

const deleteTaskApi = async (data) => {
	const response = await apiClient.put(
		"/api/tasks/deleteTasks",
		data
	);

	return response.data;
};

export const useDeleteTask = ()=>{
	return useMutation({
		mutationFn:deleteTaskApi
	})
}


export const getTaskStatsApi = async () => {
	const response = await apiClient.get(
		"/api/tasks/getTaskStats"
	);

	return response.data;
};

export const useGetTaskStats = () => {
	return useQuery({
		queryKey: ["task-stats"],
		queryFn: getTaskStatsApi,
	});
};