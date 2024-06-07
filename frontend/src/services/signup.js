import apiClient from "./httpCommon";

export async function signup(data) {
  try {
    const resp = await apiClient.post("/auth/signup", data);
    if (resp.status === 200) return resp;

    return null;
  } catch (e) {
    if (e?.response.status === 409) {
      return { status: "registeredEmail" };
    }
    return { status: "error", msg: e };
  }
}
