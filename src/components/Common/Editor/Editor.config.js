// import { MyCustomUploadAdapterPlugin } from "utils/CustomUploadAdapter"

export const editorConfiguration = {
  extraPlugins: [],
  toolbar: {
    items: [

      'heading', '|',
      'fontfamily', 'fontsize', '|',
      'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeBlock', '|',
      'undo', 'redo'

    ],
  },
  language: "vi",
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
    ],
  },
  licenseKey: "",
};
