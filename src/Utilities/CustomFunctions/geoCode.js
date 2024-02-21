import Geocode from "react-geocode";

// Set API key outside your function or in a suitable place in your application initialization
Geocode.setApiKey(process.env.REACT_APP_GOOLE_MAP_API);
Geocode.setLanguage("km"); // Set language if necessary
Geocode.setRegion("KH"); // Set region if necessary
// Optionally enable or disable logs
Geocode.enableDebug();

// Revised GetAddress function
const GetAddress = async (lat, lng) => {
  try {
    const response = await Geocode.fromLatLng(lat.toString(), lng.toString());
    const address = response.results[0].formatted_address;
    return address;
  } catch (error) {
    console.error(error);
    return null; // Or handle the error as needed
  }
};

export default GetAddress;
