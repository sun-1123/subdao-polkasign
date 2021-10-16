import service from "../utils/request";

export const getFaucet = (url) => {
  return service({
    url: `/substrate/faucet/${encodeURIComponent(url)}`,
    method: "GET",
  });
};
