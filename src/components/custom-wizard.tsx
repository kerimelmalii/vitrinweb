"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { CUSTOM_QUESTIONS } from "@/data/agency";

/** İşletmeye özel çözüm için üç soruluk yönlendirme; cevaplar keşif formuna not olarak taşınır. */
export function CustomWizard() {
  const id = useId();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [err, setErr] = useState("");
  const q = CUSTOM_QUESTIONS[step];
  const last = step === CUSTOM_QUESTIONS.length - 1;

  const next = () => {
    if (step === 0 && !answers[0].trim()) {
      setErr("Başlamak için kısaca bir iş adımı yazın.");
      document.getElementById(`${id}-a`)?.focus();
      return;
    }
    setErr("");
    if (!last) {
      setStep(step + 1);
      return;
    }
    const note = CUSTOM_QUESTIONS.map((x, i) => (answers[i].trim() ? `${x.q} ${answers[i].trim()}` : ""))
      .filter(Boolean)
      .join("\n");
    router.push(`/kesif-gorusmesi?urun=isletmeye-ozel&not=${encodeURIComponent(note.slice(0, 1000))}`);
  };

  return (
    <div className="wiz">
      <div className="wiz-prog" aria-hidden="true">
        {CUSTOM_QUESTIONS.map((_, i) => (
          <i key={i} className={i <= step ? "on" : ""}></i>
        ))}
      </div>
      <p className="fine">
        Soru {step + 1} / {CUSTOM_QUESTIONS.length}
      </p>
      <label className="h-3 wiz-q" htmlFor={`${id}-a`}>
        {q.q}
      </label>
      <textarea
        id={`${id}-a`}
        className="input"
        rows={3}
        maxLength={300}
        placeholder={`Örnek: ${q.example}`}
        value={answers[step]}
        onChange={(e) => {
          const v = e.target.value;
          setAnswers((a) => a.map((x, i) => (i === step ? v : x)));
          if (err) setErr("");
        }}
        aria-invalid={!!err}
        aria-describedby={err ? `${id}-e` : undefined}
      />
      {err && (
        <p className="err" id={`${id}-e`} role="alert">
          {err}
        </p>
      )}
      <div className="wiz-act">
        {step > 0 && (
          <button type="button" className="btn btn-line" onClick={() => setStep(step - 1)}>
            Geri Dönün
          </button>
        )}
        <button type="button" className="btn btn-primary" onClick={next}>
          {last ? "Keşif Formuna Geçin" : "Devam Edin"}
        </button>
      </div>
    </div>
  );
}
