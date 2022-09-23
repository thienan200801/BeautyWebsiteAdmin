import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Table from "@editorjs/table";
import MediaModal from "components/Modals/Media/MediaModal";
import Paragraph from 'editorjs-paragraph-with-alignment';
import React, { useEffect, useRef, useState } from "react";
import { setModalVisibility } from "redux/reducer/mediaModalSlice";
import { HOST_NAME } from "utils/constant";
import CustomImageTool from "utils/custom-image-upload/index";

export default function Editor({ data, editorRef, ...props }) {
  const _ejInstance = useRef();
  // const dispatch = useDispatch();
  const [modalCb, setModalCb] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openLibrary = (cb) => {
    if (cb) {
      setModalVisible(true);
      setModalCb(() => cb);
    } else setModalVisibility(false);
  };

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }
    return () => {
      // editorRef.current.destroy();
      editorRef.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: document.querySelector("#editorJs"),
      logLevel: "ERROR",
      data: data,

      onReady: () => {
        editorRef.current = editor;
        // const undo = new Undo({ editor });
        // if (data) undo.initialize(data);
      },
      onchange: () => {
        console.log("data", editor.data);
      },

      autofocus: true,
      tools: {
        header: Header,
        customImage: {
          class: CustomImageTool,
          config: {
            onSelectFile: (tool) => {
              const cb = (img) => {
                const data = tool.data;
                data.file = { url: img.url, alt: img.alt }; // set image
                data.caption = data.caption || img.title;
                tool.data = data;
              };
              openLibrary(cb);
            },
            captionPlaceholder: "Imgae caption",
            hostname: HOST_NAME,
          },
        },
        linkTool: LinkTool,
        list: List,
        checklist: CheckList,
        delimiter: Delimiter,
        quote: Quote,
        marker: Marker,
        embed: Embed,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        code: Code,
        raw: Raw,
        inlineCode: InlineCode,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
    });
  };
  return (
    <>
      <div id="editorJs"></div>
      <MediaModal
        selectImageCb={modalCb}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      ;
    </>
  );
}
