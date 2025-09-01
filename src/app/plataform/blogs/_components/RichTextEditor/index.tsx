"use client";

import { useEffect, useRef } from "react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import type { RichTextEditorProps } from "./rich-text-editor.props";

function ToolbarButton({
  onClick,
  children,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
}

function RichTextEditor<T extends FieldValues = FieldValues>({
  control,
  name,
  label = "Conteúdo",
  placeholder = "Escreva o conteúdo aqui...",
}: RichTextEditorProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure contenteditable has proper styling/behavior
    if (ref.current) {
      ref.current.addEventListener("paste", (e: any) => {
        e.preventDefault();
        const text = (e.clipboardData || (window as any).clipboardData).getData(
          "text/plain"
        );
        document.execCommand("insertText", false, text);
      });
    }
  }, []);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (ref.current) ref.current.focus();
  };

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="flex flex-wrap gap-1 mb-2 bg-gray-50 border border-gray-200 rounded-md p-1">
            <ToolbarButton onClick={() => exec("bold")} title="Negrito">
              B
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("italic")} title="Itálico">
              <span className="italic">I</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("underline")} title="Sublinhado">
              <span className="underline">U</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => exec("insertUnorderedList")}
              title="Lista"
            >
              • List
            </ToolbarButton>
            <ToolbarButton
              onClick={() => exec("insertOrderedList")}
              title="Lista ordenada"
            >
              1. List
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("formatBlock", "h2")} title="H2">
              H2
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("formatBlock", "h3")} title="H3">
              H3
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                const url = prompt("URL do link:") || "";
                if (url) exec("createLink", url);
              }}
              title="Inserir link"
            >
              Link
            </ToolbarButton>
            <ToolbarButton
              onClick={() => exec("removeFormat")}
              title="Limpar formatação"
            >
              Limpar
            </ToolbarButton>
          </div>
          <div
            ref={ref}
            contentEditable
            dir="ltr"
            className="min-h-40 bg-white border border-neutral-300 focus:border-[#0b3954] text-neutral-900 text-sm w-full rounded-md py-2 px-3 font-medium outline-none transition-all duration-300 focus:ring-0 placeholder:text-neutral-400 text-left"
            style={{ unicodeBidi: "isolate" }}
            onInput={(e) =>
              field.onChange((e.target as HTMLDivElement).innerHTML)
            }
            onBlur={(e) => field.onBlur()}
            dangerouslySetInnerHTML={{ __html: field.value || "" }}
            data-placeholder={placeholder}
          />
        </div>
      )}
    />
  );
}

export default RichTextEditor;
