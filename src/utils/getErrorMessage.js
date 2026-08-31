export function getErrorMessage(err) {
  if (err.code === "ECONNABORTED") {
    return "Request timed out. Check your connection and try again.";
  }
  if (!err.response) {
    return "Can't reach the server. Check your connection and try again.";
  }
  return (
    err.response.data?.errors?.join(" ") || err.response.data?.message || "Something went wrong. Try again."
  );
}
