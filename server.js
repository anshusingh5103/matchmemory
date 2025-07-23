document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const answers = [];

  for (let i = 0; i < form.querySelectorAll(".question-block").length; i++) {
    answers.push(formData.get(`q${i}`));
  }

  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("result").innerText = `Your Score: ${data.score}`;
    });
});
