import apiClient from "./httpCommon";

export async function validateToken() {
  try {
    const resp = await apiClient.get("/auth/validate-token");
    if (resp.status === 200) return resp;
    return null;
  } catch (e) {
    return { status: "error", msg: e };
  }
}
