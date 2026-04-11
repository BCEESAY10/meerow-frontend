import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  error,
  label,
  minHeight = "300px",
}) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
          {label}
        </label>
      )}
      <div
        className="rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden"
        style={{ minHeight }}>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
          className="rich-text-editor"
        />
      </div>
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
      )}
      <p className="text-[#6B6B7D] dark:text-[#B8B8C8] text-sm mt-2">
        Formatting: Bold, Italic, Underline, Blockquote, Lists, Links
      </p>
    </div>
  );
};
