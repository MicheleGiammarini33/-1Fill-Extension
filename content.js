async function fillResumeWithAI() {
  const endpoint = "https://wia.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";
  const apiKey = "3a228f3c864147999f24e8c63886263a";

  const prompt = "Fill in a standard resume with the following parameters: name, address, work experience, education, skills.";

  const requestBody = {
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

function autoFillResume() {
  fillResumeWithAI().then((result) => {
    document.querySelector('input[name="name"]').value = result.name || '';
    document.querySelector('input[name="address"]').value = result.address || '';
    document.querySelector('input[name="experience"]').value = result.experience || '';
    document.querySelector('input[name="education"]').value = result.education || '';
    document.querySelector('input[name="skills"]').value = result.skills || '';
  });
}

window.addEventListener("load", autoFillResume);