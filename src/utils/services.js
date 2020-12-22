import axios from "axios";

export async function getAllBreeds() {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    if (response.status === 200 && response.data.error === false) {
      return response.data;
    } else return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getAllDogs(breed) {
  try {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random/6`
    );
    if (response.status === 200 && response.data.error === false) {
      return response.data;
    } else return response.data;
  } catch (err) {
    return err.response.data;
  }
}
