const API_URL = "https://geo.ipify.org/api/v1?";
export const IpRegex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
export const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;

export default async function fetchIpLocation(ip) {
  let url = `${API_URL}apiKey=${process.env.REACT_APP_API_KEY}`;

  if(ip) {
    if ( IpRegex.test(ip)) {
      url += `&ipAddress=${ip}`;
    }else if ( domainRegex.test(ip)) {
      url += `&domain=${ip}`;
    }else{
      throw new Error('Enter a valid IP address or domain');
    }
  }

  try {
    const response = await fetch(url);
    console.log(response);

    if (response.status === 200) {
      let data = await response.json();
      console.log("success", data);
      const { location: { city, region, lat, lng, timezone }, isp, ip } = data;
      return {
        coordinates: {lat, lng},
        textInfo: {
          location: `${region}, ${city}`,
          timezone: `UTC${timezone}`,
          isp,
          ip
        }
      }
    } else {
      throw new Error(response.statusText);
      // console.log(response.statusText);
    }
  } catch (error) {
    // console.log(error.message);
    throw new Error(`${error.message}. Enter a valid IP address or domain.`);
  }
}