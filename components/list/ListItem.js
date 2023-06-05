import { StyleSheet, Text, View } from "react-native";

// Le composant qui peut être utilisé dans une liste ou un scrollview.
export const ListItem = ({ title, subTitle, subTitleColor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subTitle && (
        <View style={styles.subTitleContainer}>
          <Text style={{
            ...styles.subTitle,
            color: subTitleColor,
          }}>{subTitle}</Text>
        </View>
      )}
    </View>
  );
};

// Les styles pour le composant ListItem
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF2FA",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  title: {
    color: "black",
    fontSize: 22,
  },
  subTitle: {
    fontSize: 16,
  },
  subTitleContainer: {
    width: "100%",
    alignItems: "center",
  },
});
