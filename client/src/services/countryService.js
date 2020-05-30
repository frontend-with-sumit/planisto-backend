import http from "./httpService";

const url = "https://restcountries.eu/rest/v2/all";

export async function getCountries() {
  let { data: countries } = await http.get(url);
  countries = countries.map((c) => c);
  countries.splice(150, 70);

  return countries;
}
