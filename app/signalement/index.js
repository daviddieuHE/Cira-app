import { useState } from "react";
import { Picture } from "./Picture";
import { SignalementForm } from "./Form";





export default function Page() {
// Crée un état pour la photo, initialisé à null
  const [picture, setPicture] = useState(null);


  if(!picture) {
// Si aucune photo n'a été prise, affiche le composant Picture
    return <Picture setPicture={setPicture} />
  }

  return (
// Si une photo a été prise, affiche le formulaire d'enregistrement de signalement
     <SignalementForm picture={picture} />
  )
}
