// récupérer une liste de rapports depuis un serveur.
// API Fetch pour faire une requête HTTP GET vers l'URL spécifiée.
export const getReports = () =>
  fetch("https://cira-production.up.railway.app/api/reports").then(
// Une fois la réponse obtenue, on la convertit en JSON. 
// Notez que la conversion en JSON est une opération asynchrone, d'où l'utilisation de .then()
    (res) => res.json()
  );



// poster (ou soumettre) un rapport à un serveur.
// API Fetch pour faire une requête HTTP POST vers l'URL spécifiée.
// Pour une requête POST, nous devons fournir des informations supplémentaires, comme la méthode, les en-têtes et le corps de la requête.
// Dans ce cas, nous lui envoyons des données de formulaire multipart/form-data.
export const postReport = (formData) => 
  fetch("https://cira-production.up.railway.app/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });



// récupérer une liste de singlaments depuis le serveur.
// API Fetch pour faire une requête HTTP GET vers l'URL spécifiée.

export const getAdvertisements = () =>
  fetch(
    "https://cira-production.up.railway.app/api/advertisements"
  ).then((res) => res.json());
