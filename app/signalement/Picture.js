// Import de la librairie expo-camera pour utiliser la caméra du téléphone
// Import de react-router pour la navigation entre les écrans
import { Camera, CameraType } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Picture = ({ setPicture }) => {
// Demandez l'autorisation d'utiliser la caméra du téléphone
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(); // Référence à l'objet Camera
  const router = useRouter(); // Instance du routeur
  
// Si l'autorisation n'a pas encore été accordée, affichez un message en attente
  if (!permission) {
    return <Text>Waiting for permissions...</Text>;
  }

  // Si l'autorisation n'est pas accordée, demandez-la
  if (!permission.granted) {
    requestPermission();
  }

  // Si l'autorisation est accordée, affichez la vue de la caméra
  return (
    <View
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <Camera
        type={CameraType.back}
        style={{
          flex: 1,
          width: "100%",
        }}
        ref={cameraRef}
      />
      <View
        style={{
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          flex: 1,
          width: "100%",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              const picture = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.5,
              });
              setPicture(picture);
            }}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          padding: 20,
          width: "20%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "space-start",
            alignItems: "space-start",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              router.back();
            }}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: "#B94919",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{
              color: "#fff",
              fontSize: 30,
            }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
