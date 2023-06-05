import { getReports } from "./api";

// Test unitaire qui vérifie que la route API renvoi un tableau de signalements
describe("getReports", () => {
  it("should fetch reports from the server", async () => {
    const reports = await getReports();
    expect(reports).toBeDefined();
    expect(Array.isArray(reports)).toBe(true);
  });
});