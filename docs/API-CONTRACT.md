# AI Interview Coach API Contract

## Resume Analysis

POST /api/resume-analysis

Input:
{
  "resumeText": ""
}

Output:
{
  "skills": [],
  "experience": "",
  "strengths": []
}

---

## Question Generation

POST /api/generate-questions

Input:
{
  "skills": []
}

Output:
{
  "questions": []
}

---

## Evaluation

POST /api/evaluate-answer

Input:
{
  "question": "",
  "answer": ""
}

Output:
{
  "score": 0,
  "feedback": "",
  "weak_areas": []
}