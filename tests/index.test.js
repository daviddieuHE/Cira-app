// Importer les fonctions de test
import { screen, renderRouter } from "expo-router/src/testing-library";

// Définir le test
test("render the application", async () => {
  renderRouter();
// Trouver "Annonces"
  const annonceTitle = await screen.findByText("Annonces");
// Vérifier que "Annonces" existe

  expect(annonceTitle).toBeTruthy();
// Trouver "Mes signalements"
  const reportTitle = await screen.findByText("Mes signalements");
// Vérifier que "Mes signalements" existe

  expect(reportTitle).toBeTruthy();
// Trouver "Nouveau signalement"
  const reportButton = await screen.findByText("Nouveau signalement");
// Vérifier que "Nouveau signalement" existe
  expect(reportButton).toBeTruthy();
});
