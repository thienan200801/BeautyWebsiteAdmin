import "./style.css";

import Editor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

import { editorConfiguration } from "./Editor.config";
export default function ReactEditor({ editorRef, data }) {
  return (
    <>
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={data}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
      />
    </>
  );
}
