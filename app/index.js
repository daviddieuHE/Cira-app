import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { List } from "../components/list/List";
import { ListItem } from "../components/list/ListItem";
import { Link } from "expo-router";
import { SignalementIcon } from "../components/icons/SignalementIcon";
import { useQuery } from "@tanstack/react-query";
import { getAdvertisements, getReports } from "../requests/api";

// Objet pour gérer l'affichage des statuts des signalements
const statusOptions = {
  signale: {
    color: "#FF7A00",
    text: "En attente de traitement",
  },
  pris_en_charge: {
    color: "#0047FF",
    text: "Pris en charge",
  },
  traite: {
    color: "#00B945",
    text: "Traité",
  },
};

const categories = {
  depot_sauvage: "Dépot sauvage",
  voirie: "Voirie",
  bien_public: "Bien public",
  autre: "Autre",
};

export default function Page() {
  // Utilisation de React Query pour récupérer les données des signalements depuis une API
  const reportsQuery = useQuery(["reports"], getReports);
  const advertisementsQuery = useQuery(["advertisements"], getAdvertisements);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <List
        title="Annonces"
        loading={advertisementsQuery.isFetching}
        onRefresh={() => advertisementsQuery.refetch()}
      >
        {advertisementsQuery.data &&
          advertisementsQuery.data.map(({ title }, index) => (
            <ListItem key={index} title={title} />
          ))}
      </List>
      <List
        title="Mes signalements"
        loading={reportsQuery.isFetching}
        onRefresh={() => reportsQuery.refetch()}
      >
        {reportsQuery.data &&
          reportsQuery.data.map(({ created_at, status, category }, index) => {
            const { color, text } = statusOptions[status];
            return (
              <ListItem
                key={index}
                title={`${new Date(created_at).toLocaleDateString()} - ${
                  categories[category]
                }`}
                subTitle={text}
                subTitleColor={color}
              />
            );
          })}
      </List>
      <View style={styles.linkContainer}>
        <Link href={"/signalement"}>
          <View style={styles.linkContent}>
            <SignalementIcon />
            <Text style={styles.linkText}>Nouveau {"\n"} signalement</Text>
          </View>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// Styles de la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF2FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    paddingVertical: 40,
    gap: 5,
  },
  linkContainer: {
    backgroundColor: "#A4BD01",
    borderRadius: 29,
    paddingVertical: 13,
    paddingHorizontal: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 34,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    alignItems: "center",
    justifyContent: "center",
  },
  linkContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  linkText: {
    color: "black",
    fontSize: 29,
    textAlign: "center",
    fontWeight: "bold",
  },
});
