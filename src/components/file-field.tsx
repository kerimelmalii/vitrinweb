"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { FILE_RULES } from "@/lib/security";

interface FileFieldProps {
  id: string;
  label: string;
  hint: string;
  accept: string;
  multiple: boolean;
  files: File[];
  onFiles: (files: File[]) => void;
  types?: readonly string[];
  maxSize?: number;
}

const sizeLabel = (b: number) => (b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");

/* Dosyalar türe, boyuta ve adede göre süzülür. Sunucu, imzalı yüklemede aynı kuralları ve içerik taramasını uygular. */
export function FileField({ id, label, hint, accept, multiple, files, onFiles, types, maxSize }: FileFieldProps) {
  const [over, setOver] = useState(false);
  const [msg, setMsg] = useState("");
  const cap = maxSize ?? FILE_RULES.maxSize;
  const add = (list: FileList | null) => {
    const a = Array.from(list || []);
    if (!a.length) return;
    const okType = (f: File) => (types || FILE_RULES.image).includes(f.type);
    const bad = a.filter((f) => !okType(f));
    const big = a.filter((f) => okType(f) && f.size > cap);
    const good = a.filter((f) => okType(f) && f.size <= cap);
    let next = multiple ? [...files, ...good] : good.slice(0, 1);
    const cut = next.length > FILE_RULES.maxFiles;
    next = next.slice(0, FILE_RULES.maxFiles);
    const m: string[] = [];
    if (bad.length) m.push(bad.length + " dosya desteklenmeyen türde olduğu için eklenmedi.");
    if (big.length) m.push(big.length + " dosya " + sizeLabel(cap) + "'tan büyük olduğu için eklenmedi.");
    if (cut) m.push("En fazla " + FILE_RULES.maxFiles + " dosya ekleyebilirsiniz.");
    setMsg(m.join(" "));
    if (good.length) onFiles(next);
  };
  return (
    <div className="fld">
      <span className="label">{label}</span>
      <label
        className={"drop " + (over ? "over" : "")}
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          add(e.dataTransfer.files);
        }}
      >
        <Icon n="upload" size={22} />
        <span>
          <b>Dosya seçin</b> veya buraya sürükleyin
        </span>
        <span className="fine">{hint}</span>
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {msg && (
        <p className="ferr" role="alert">
          {msg}
        </p>
      )}
      {files.length > 0 && (
        <ul className="flist">
          {files.map((f, i) => (
            <li key={f.name + i}>
              <span>
                {f.name} <span className="mute">({sizeLabel(f.size)})</span>
              </span>
              <button
                aria-label={f.name + " dosyasını kaldır"}
                onClick={() => onFiles(files.filter((_, j) => j !== i))}
              >
                <Icon n="x" size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
