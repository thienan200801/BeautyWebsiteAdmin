import client from "./index";

const slideApi = {
  getAllSlides: async () => {
    let url = "/slide";
    const response = await client.get(url);
    return response.data;
  },
  updateSlide: async () => {},
};

export default slideApi;
