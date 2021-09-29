const API_URL = "https://geo.ipify.org/api/v1?";

export default async function fetchIpLocation(ip) {
  var url = `${API_URL}apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ip}`;

  try {
    const response = await fetch(url);
    let data = await response.json();
    // console.log("success", data);
    const { location: { city, region, lat, lng, timezone }, isp,ip } = data;
    return {
      coordinates: {lat, lng},
      textInfo: {
        location: `${region}, ${city}`,
        timezone: `UTC${timezone}`,
        isp,
        ip
      }
    }
  } catch (error) {
    console.log(error)
  }
}