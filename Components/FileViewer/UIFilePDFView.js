import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PDFView from "react-native-view-pdf";
import { View } from "react-native";
import { useDispatch } from "react-redux";
const UIFilePDFView = () => {
  const dispatch = useDispatch();
  const [filename, setfilename] = useState("");
  const getpdffilename = async () => {
    try {
      const mobile_pdf_filename = await AsyncStorage.getItem(
        "mobile_pdf_filename"
      );

      if (mobile_pdf_filename !== null) {
        setfilename(mobile_pdf_filename);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };
  useEffect(() => {
    let mounted = true;
    const getpdffile = () => {
      getpdffilename();
    };

    mounted && getpdffile();
    return () => {
      mounted = false;
    };
  }, [dispatch, filename]);
  const resources = {
    file:
      Platform.OS === "ios"
        ? `/sdcard/DCIM/Premiere/${filename}`
        : `/sdcard/DCIM/Premiere/${filename}`,
    // `file:///storage/emulated/0/DCIM/Premiere/${fullpathoffile}.pdf`,
    // url:
    //'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    //   `${diagnostic_url}${resurls}`,
    //'https://pdftron.s3.amazonaws.com/downloads/pdfref.pdf',
    base64: "asdsadasd",
  };
  const resourceType = "file";
  return (
    <View style={{ flex: 1 }}>
      <PDFView
        fadeInDuration={250.0}
        style={{ flex: 1 }}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={(e) => console.log(`PDF rendered from ${resourceType}`)}
        onError={(e) => console.log("Cannot render PDF", e)}
      />
    </View>
  );
};

UIFilePDFView.propTypes = {};

export default UIFilePDFView;
