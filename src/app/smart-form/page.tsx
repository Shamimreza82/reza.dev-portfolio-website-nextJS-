"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SmartForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
    income: "",
  });

  const [typingField, setTypingField] = useState<string | null>(null);

  // 🧠 Debounce Timer Reference
  useEffect(() => {
    if (!typingField) return;

    const timeout = setTimeout(async () => {
      try {
        const { data } = await axios.post("http://localhost:4002/public/test", {
          formData,
          fieldName: typingField,
          fieldLabel: typingField,
        });

        // Update only the specific field with AI suggestion
        setFormData((prev) => ({
          ...prev,
          [typingField]: data.suggestion || prev[typingField],
        }));
      } catch (error) {
        console.error("AI suggestion failed:", error);
      }
    }, 20000); // ⏳ waits 800ms after user stops typing

    return () => clearTimeout(timeout);
  }, [formData, typingField]);

  // Handle typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTypingField(name); // Track which field is being typed
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-slate-900 text-white rounded-xl">
      <h2 className="text-2xl font-semibold">AI Dynamic Form</h2>

      {Object.keys(formData).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="mb-1 capitalize">{key}</label>
          <input
            name={key}
            placeholder={`Enter ${key}`}
            value={formData[key as keyof typeof formData]}
            onChange={handleChange}
            className="p-2 w-full rounded bg-slate-800 border border-slate-700"
          />
        </div>
      ))}
    </div>
  );
}
