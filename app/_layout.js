// Importation de Slot depuis expo-router pour être utilisé comme placeholder pour le rendu des composants
import {Slot} from "expo-router"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

export default function Layout() {
// Création d'une instance de QueryClient
    const queryClient = new QueryClient()

// Wrapping du composant Slot dans QueryClientProvider pour'utiliser les fonctionnalités de React Query dans les composants rendus par Slot.
    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    )
}