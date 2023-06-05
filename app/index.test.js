import { screen, renderRouter } from "expo-router/src/testing-library";

//Test unitaire qui vérifie que l'application est bien rendue
test("render the application", async () => {
  renderRouter();
  const annonceTitle = await screen.findByText("Annonces");
  expect(annonceTitle).toBeTruthy();

  const reportTitle = await screen.findByText("Mes signalements");
  expect(reportTitle).toBeTruthy();

  const reportButton = await screen.findByText("Nouveau signalement");
  expect(reportButton).toBeTruthy();
});