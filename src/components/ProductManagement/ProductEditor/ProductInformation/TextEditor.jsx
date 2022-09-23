import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

function TextEditor({ value = {}, onChange }) {
  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  const dataOnChange = (event, editor) => {
    const data = editor.getData();
    triggerChange(data);
  };

  return (
    <div className="list-inside list-item ">
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "undo",
            "redo",
          ],
        }}
        data={value}
        // config={}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={dataOnChange}
      />
    </div>
  );
}

export default TextEditor;
