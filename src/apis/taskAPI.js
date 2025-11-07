import apiClient from "./apiClient";


export const getTasksOfUser = () =>apiClient.get('/task/getTasksOfUser');

export const updateTaskStatus = (taskId, status) => apiClient.patch(`/task/updateTaskStatus/${taskId}`, {status});