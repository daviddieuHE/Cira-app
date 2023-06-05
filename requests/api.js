export const getReports = () =>
  fetch("https://cira-server-production.up.railway.app/api/reports").then(
    (res) => res.json()
  );

export const postReport = (formData) =>
  fetch("https://cira-server-production.up.railway.app/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });