export default class MediaLibraryTool {
  constructor({ data, config }) {
    this.data = data;
    this.config = config;
  }
  render() {
    const wrapper = document.createElement("div");
    const input = document.createElement("input");

    wrapper.classList.add("simple-image");
    wrapper.appendChild(input);

    input.placeholder = "Paste an image URL...";
    input.value = this.data && this.data.url ? this.data.url : "";

    return wrapper;
  }

  save(blockContent) {
    return {
      url: blockContent.value,
    };
  }
}
