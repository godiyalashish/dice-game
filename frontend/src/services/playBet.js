import apiClient from "./httpCommon";

export async function playBet(betType, betPrice) {
  try {
    const resp = await apiClient.post("game/play", {
      selectedOption: betType,
      bet: betPrice,
    });
    if (resp.status === 200) return resp;
    return null;
  } catch (e) {
    return { status: "error", msg: e };
  }
}
