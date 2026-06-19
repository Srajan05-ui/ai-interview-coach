"use client";

import { useState } from "react";

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const uploadResume = async () => {
    try {
      if (!file) {
        alert("Please select a file first");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading file...");

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setResult("Upload failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Resume Upload Test</h1>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button
        onClick={uploadResume}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Upload Resume
      </button>

      <br />
      <br />

      <pre>{result}</pre>
    </div>
  );
}