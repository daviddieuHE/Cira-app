import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

// Ce composant est utilisé pour afficher une liste de composants enfants. 
// Le chargement des données de cette liste peut être rafraîchi manuellement par l'utilisateur.
export const List = ({ title, children, loading, onRefresh }) => {

// recharger les données lorsque l'utilisateur effectue une action de "pull-to-refresh" sur la liste.
// ScrollView permet à la liste d'être défilable si elle dépasse la hauteur de l'écran
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentList}
        style={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#06668C",
    width: "100%",
    borderRadius: 29,
    paddingVertical: 10,
    paddingHorizontal: 19,
    flex: 1,
    alignItems: "center",
    gap: 4,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  titleContainer: {
    backgroundColor: "#427AA1",
    borderRadius: 29,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  title: {
    fontSize: 22,
    color: "white",
  },
  contentList: {
    gap: 5,
  },
  list: {
    width: "100%",
  },
});