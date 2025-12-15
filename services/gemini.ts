<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>AI 책 추천</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      input {
        padding: 6px;
        width: 200px;
      }
      button {
        padding: 6px 10px;
        margin-left: 4px;
      }
      .book {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
      }
      .title {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h2>📚 AI 책 추천</h2>

    <input id="query" placeholder="예: 힐링되는 에세이" />
    <button onclick="recommend()">추천 받기</button>

    <div id="result"></div>

    <script>
      function recommend() {
        const query = document.getElementById("query").value;
        const result = document.getElementById("result");
        result.textContent = "불러오는 중...";

        google.script.run.withSuccessHandler((data) => {
          result.innerHTML = "";

          data.forEach((book) => {
            const div = document.createElement("div");
            div.className = "book";
            div.innerHTML = `
              <div class="title">📖 ${book.title}</div>
              <div>✍ ${book.author}</div>
              <div>💡 ${book.reason}</div>
            `;
            result.appendChild(div);
          });
        }).getBookRecommendations(query);
      }
    </script>
  </body>
</html>
