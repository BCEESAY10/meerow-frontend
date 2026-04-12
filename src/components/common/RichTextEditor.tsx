import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
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
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    // Initialize Quill
    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });

    // Set initial content
    if (value) {
      isUpdatingRef.current = true;
      quillRef.current.root.innerHTML = value;
      isUpdatingRef.current = false;
    }

    // Handle text changes
    quillRef.current.on("text-change", () => {
      if (!isUpdatingRef.current && quillRef.current) {
        const html = quillRef.current.root.innerHTML;
        onChange(html);
      }
    });

    return () => {
      quillRef.current = null;
    };
  }, []);

  // Update Quill content when value prop changes
  useEffect(() => {
    if (quillRef.current && !isUpdatingRef.current) {
      const currentHtml = quillRef.current.root.innerHTML;
      if (value !== currentHtml) {
        isUpdatingRef.current = true;
        quillRef.current.root.innerHTML = value;
        isUpdatingRef.current = false;
      }
    }
  }, [value]);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-[#1E1E2E] dark:text-[#FDF6EE] mb-2">
          {label}
        </label>
      )}
      <div
        className={`rounded-lg border ${
          error
            ? "border-red-500 dark:border-red-500"
            : "border-gray-300 dark:border-gray-600"
        } overflow-hidden`}
        style={{ minHeight }}>
        <div
          ref={editorRef}
          style={{
            backgroundColor: "white",
          }}
          className="rich-text-editor dark:bg-[#1E1E2E]"
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
