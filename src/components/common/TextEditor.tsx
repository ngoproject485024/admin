import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useMemo, useRef } from "react";
import ComponentCard from "./ComponentCard";

interface Props {
  title: string;
  formik: any;
  name: string;
  lang: "fa" | "en";
}

function TextEditor({ title, formik, name, lang }: Props) {
  const editorRef = useRef<any | null>(null);
  const { theme } = useTheme();

  const init = useMemo(() => {
    return {
      height: 500,
      language: lang === "fa" ? "fa" : "en",

      skin: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "oxide-dark"
        : "oxide",
      content_css: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "default",
      plugins:
        "anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount code",
      toolbar:
        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
    };
  }, [theme]);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const content = editor.getContent();

      const editorID = editor.id;
      tinymce.execCommand("mceRemoveEditor", false, { id: editorID });
      tinymce.execCommand("mceAddEditor", false, {
        id: editorID,
        options: init,
      });

      editorRef.current = tinymce.get(editorID)!;
      editorRef.current.setContent(content);
    }
  }, [theme, init, lang]);

  return (
    <ComponentCard title={title ? title : ""}>
      <Editor
        apiKey="b1l0dr2vsao1zfzn9a90sj6nojthzf6zs5hfyo0rnnt2dqx4"
        licenseKey="b1l0dr2vsao1zfzn9a90sj6nojthzf6zs5hfyo0rnnt2dqx4"
        init={init}
        value={formik?.values?.[name] || formik?.values?.[name]}
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue={formik?.values?.[name] || formik?.values?.[name]}
        onEditorChange={(e) => {
          formik.setFieldValue(name, e);
        }}
      />
    </ComponentCard>
  );
}

export default TextEditor;
