import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import Send from "../../components/icons/Send";
import { useRouter } from "expo-router";
import Back from "../../components/icons/Back";
import { useMutation } from "@tanstack/react-query";

const PicturePane = ({ picture, date, location }) => {
  const dateFormat = Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);

  return (
    <View style={stylesPicturePane.container}>
      <Image source={{ uri: picture.uri }} style={stylesPicturePane.picture} />
      <View style={stylesPicturePane.detailsContainer}>
        <View>
          <Text style={stylesPicturePane.detailsTitle}>Localistion</Text>
          <Text style={stylesPicturePane.detailsContent}>
            Latitude: {location ? location.coords.latitude.toFixed(5) : "..."}
          </Text>
          <Text style={stylesPicturePane.detailsContent}>
            Lontitude: {location ? location.coords.longitude.toFixed(5) : "..."}
          </Text>
        </View>
        <View>
          <Text style={stylesPicturePane.detailsTitle}>Date et heure</Text>
          <Text style={stylesPicturePane.detailsContent}>{dateFormat}</Text>
        </View>
      </View>
    </View>
  );
};

const CategoryPane = ({ category, setCategory }) => {
  return (
    <View style={stylesCategory.container}>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={stylesCategory.selector}
        itemStyle={stylesCategory.item}
        dropdownIconColor="white"
      >
        <Picker.Item label="Dépot sauvage" value="depot_sauvage" />
        <Picker.Item label="Voirie" value="voirie" />
        <Picker.Item label="Bien public" value="bien_public" />
        <Picker.Item label="Autre" value="autre" />
      </Picker>
    </View>
  );
};

const DescriptionPane = ({
  setDescriptionFocused,
  description,
  setDescription,
}) => {
  return (
    <View style={stylesDescription.container}>
      <Text style={stylesDescription.title}>Description</Text>
      <View style={stylesDescription.inputContainer}>
        <TextInput
          style={stylesDescription.input}
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          onFocus={() => setDescriptionFocused(true)}
          onBlur={() => setDescriptionFocused(false)}
        />
      </View>
    </View>
  );
};

const SubmitButton = ({ onClick, disable, loading }) => {
  return (
    <TouchableOpacity
      style={stylesSubmitButton.container}
      onPress={onClick}
      disabled={disable || loading}
    >
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <View style={stylesSubmitButton.icon}>
            <Send />
          </View>
          <Text style={stylesSubmitButton.text}>Envoyer</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={stylesBackButton.container}
      onPress={() => router.back()}
    >
      <Back />
    </TouchableOpacity>
  );
};

const CloseButton = () => {
  return (
    <TouchableOpacity
      style={stylesBackButton.container}
      onPress={() => Keyboard.dismiss()}
    >
      <Text style={stylesBackButton.text}>X</Text>
    </TouchableOpacity>
  );
};

export const SignalementForm = ({ picture }) => {
  const [isDescriptionFocused, setDescriptionFocused] = useState(false);
  const [category, setCategory] = useState("depot_sauvage");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [date, _] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const submitMutation = useMutation(
    ["submit"],
    () => {
      const formData = new FormData();
      formData.append("image", {
        uri: picture.uri,
        name: "image.jpg",
        type: "image/jpg",
      });

      formData.append("category", category);
      formData.append("description", description);
      formData.append("longitude", location.coords.longitude);
      formData.append("latitude", location.coords.latitude);
      formData.append("date", date.toISOString());

      return fetch("https://cira-server-production.up.railway.app/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
    },
    {
      onSuccess: () => {
        router.push("/validation");
      },
    }
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SafeAreaView />
        {!isDescriptionFocused && (
          <>
            <PicturePane picture={picture} location={location} date={date} />
            <CategoryPane category={category} setCategory={setCategory} />
          </>
        )}

        <DescriptionPane
          setDescriptionFocused={setDescriptionFocused}
          description={description}
          setDescription={setDescription}
        />
        <SubmitButton
          onClick={() => submitMutation.mutate()}
          disable={!location}
          loading={submitMutation.isLoading}
        />
        {!isDescriptionFocused && <BackButton />}
        {isDescriptionFocused && <CloseButton />}
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 19,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
});

const stylesPicturePane = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06668C",
    borderRadius: 43,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    gap: 2,
    marginTop: 20,
  },
  picture: {
    flex: 1,
    borderRadius: 34,
  },
  detailsTitle: {
    color: "white",
    fontWeight: 700,
    textDecorationLine: "underline",
  },
  detailsContent: {
    color: "white",
  },
  detailsContainer: {
    gap: 20,
  },
});

const stylesCategory = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#06668C",
    borderRadius: 43,
  },
  item: {
    color: "white",
    height: 150,
  },
  selector: {
    color: "white",
    height: 150,
  },
});

const stylesDescription = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#06668C",
    borderRadius: 43,
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 32,
  },
  input: {
    width: "100%",
    flex: 1,
    color: "white",
    fontSize: 32,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#427AA1",
    borderRadius: 43,
    padding: 20,
    flex: 1,
  },
});

const stylesSubmitButton = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#A4BD01",
    borderRadius: 43,
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    color: "white",
    fontSize: 55,
  },
  icon: {
    backgroundColor: "#679436",
    borderRadius: 100,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 3,
  },
});

const stylesBackButton = StyleSheet.create({
  container: {
    backgroundColor: "#B94919",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    transform: [{ rotate: "180deg" }],
    width: 75,
    height: 75,
  },
  text: {
    color: "white",
    fontSize: 40,
  },
});