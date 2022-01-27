import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 100,
    height: 100,
  },
  submitText: {
    color: "white",
    textAlign: "center",
  },
  borderStyleHighLighted: {
    borderColor: "black",
  },
  btn: {
    marginTop: 50,
    paddingTop: 10,
    width: "50%",
    alignSelf: "center",
    height: 50,
    backgroundColor: "#0084FF",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#0084FF",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    color: "black",
    fontSize: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "black",
  },
});
export default styles;
