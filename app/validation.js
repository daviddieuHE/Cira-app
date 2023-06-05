// Import des composants depuis expo et react-native
import { Link } from "expo-router";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

// Création du composant ThanksPane qui affiche un message de remerciement
const ThanksPane = () => {
  return (
    <View style={styleThanks.container}>
      <Text style={styleThanks.title}>Merci</Text>
      <Text style={styleThanks.subTitle}>
        de contribuer à rendre votre ville meilleure.
      </Text>
    </View>
  );
};

export default function Page() {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ThanksPane />
      <Link href="/" style={styles.link}>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Retour à l'accueil</Text>
        </View>
      </Link>
    </View>
  );
}

// Styles pour la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    position: "absolute",
    bottom: 200,
    width: "100%",
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#A4BD01",
    borderRadius: 43,
    paddingVertical: 13,
    paddingHorizontal: 20,
    width: "100%",
  },
  linkText: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
  },
});

// Styles pour le composant ThanksPane
const styleThanks = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#427AA1",
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 49,
  },
  subTitle: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
  },
});
