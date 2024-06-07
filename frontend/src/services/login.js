import apiClient from "./httpCommon";

export async function login(data) {
  try {
    const resp = await apiClient.post("/auth/login", data);
    if (resp.status === 200) return resp;
    return null;
  } catch (e) {
    return { status: "error", msg: e };
  }
}
