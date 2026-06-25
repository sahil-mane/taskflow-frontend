import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const loginApi = async ({email, password}) => {
	const response = await apiClient.post("/api/auth/login", {
		email,
		password,
	});
	return response.data;
};

export const useLogin = () => {
	return useMutation({
		mutationFn: loginApi,
		mutationKey: ["login"],
	})
}



const registerApi = async ({name,email, password}) => {
	const response = await apiClient.post("/api/auth/register", {
		name,
		email,
		password,
	});
	return response.data;
};

export const useRegister = () => {
	return useMutation({
		mutationFn: registerApi,
		mutationKey: ["register"],
	})
}