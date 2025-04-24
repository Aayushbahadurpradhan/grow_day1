function analyzeText() {
  const text = document.getElementById("inputText").value;
  const keyword = document.getElementById("keyword").value;

  const totalChars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  const regex = new RegExp(keyword, "gi");
  const matches = text.match(regex);
  const occurrences = matches ? matches.length : 0;

  const capitalWords = words.filter(word => /^[A-Z]/.test(word)).length;

  const numberCount = (text.match(/[0-9]/g) || []).length;

  const specialCount = (text.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;

  const otherCount = (text.match(/[^a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;

  document.getElementById("charCount").textContent = totalChars;
  document.getElementById("wordCount").textContent = totalWords;
  document.getElementById("occurrences").textContent = occurrences;
  document.getElementById("capitalWords").textContent = capitalWords;
  document.getElementById("numberCount").textContent = numberCount;
  document.getElementById("specialCount").textContent = specialCount;
  document.getElementById("otherCount").textContent = otherCount;
}
