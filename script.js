// Molar Mass Data
const mass = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
  Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723, Ge: 72.63,
  As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Nb: 92.906, Mo: 95.95, Tc: 98, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41,
  In: 114.82, Sn: 118.71, Sb: 121.76, Te: 127.6, I: 126.9, Xe: 131.29, Cs: 132.91, Ba: 137.33,
  La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Pm: 145, Sm: 150.36, Eu: 151.96, Gd: 157.25,
  Tb: 158.93, Dy: 162.5, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
  Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
  Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209, At: 210, Rn: 222, Fr: 223, Ra: 226, Ac: 227,
  Th: 232.04, Pa: 231.04, U: 238.03, Np: 237, Pu: 244, Am: 243, Cm: 247, Bk: 247, Cf: 251,
  Es: 252, Fm: 257, Md: 258, No: 259, Lr: 266, Rf: 267, Db: 268, Sg: 269, Bh: 270, Hs: 277,
  Mt: 278, Ds: 281, Rg: 282, Cn: 285, Nh: 286, Fl: 289, Mc: 290, Lv: 293, Ts: 294, Og: 294
};

// Utility
const $ = id => document.getElementById(id);

// Main molar mass function
async function go() {
  const f = $("inp").value.trim().replace(/\s+/g, '');
  const out = $("out"), btns = $("btnRow"), img = $("molImg");

  if (!f) {
    out.textContent = '';
    img.style.display = 'none';
    btns.style.display = 'none';
    return;
  }

  try {
    const m = parseCompound(f);
    out.textContent = `${m.toFixed(3)} g/mol`;
    out.classList.remove('error');
    btns.style.display = 'block';
    fetchImage(f);
    fetchName(f);
  } catch (e) {
    out.textContent = e.message;
    out.classList.add('error');
    btns.style.display = 'none';
    img.style.display = 'none';
  }
}

// Copy molar mass to clipboard
function copy() {
  const text = $("out").textContent;
  const numberOnly = text.split(" ")[0];
  navigator.clipboard?.writeText(numberOnly);
  const input = $("inp").value;
  if (input && numberOnly) addToHistory(input, numberOnly);
}

// Export history as CSV
function csv() {
  const history = JSON.parse(localStorage.getItem("molarHistory") || "[]");

  if (history.length === 0) {
    alert("No history available to export.");
    return;
  }

  let csv = "Compound,Molar Mass (g/mol),Pinned\n";
  history.forEach(entry => {
    const row = `"${entry.input}","${entry.result}","${entry.pinned ? "Yes" : "No"}"`;
    csv += row + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "molar_mass_history.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// Share molar mass info
function share() {
  if (navigator.share) {
    navigator.share({
      title: 'Molar Mass',
      text: `${$("inp").value}: ${$("out").textContent}`
    });
  } else {
    copy();
  }
}

// Formula parser
function parseCompound(formula) {
  const f = formula.replace(/\s+/g, '').replace(/·/g, '+');
  let i = 0;

  function parseExpr() {
    let total = parseTerm();
    while (i < f.length && f[i] === '+') {
      i++;
      total += parseTerm();
    }
    return total;
  }

  function parseTerm() {
    let factor = 1;
    if (isDigit(f[i])) {
      factor = readNum();
      if (f[i] === '*') i++;
    }
    const subMass = parseGroup();
    return factor * subMass;
  }

  function parseGroup() {
    if (f[i] === '(' || f[i] === '[') {
      i++;
      const groupMass = parseExpr();
      if (f[i] === ')' || f[i] === ']') i++;
      const qty = readNum();
      return groupMass * (qty || 1);
    } else {
      return parseFrag();
    }
  }

  function parseFrag() {
    let total = 0;
    while (i < f.length) {
      if ('+)]'.includes(f[i])) break;
      if ('(['.includes(f[i])) {
        total += parseGroup();
        continue;
      }
      const el = readEl();
      if (!mass[el]) throw Error(`Unknown element "${el}"`);
      const qty = readNum();
      total += mass[el] * (qty || 1);
    }
    return total;
  }

  function readEl() {
    let el = f[i++];
    if (f[i] && /[a-z]/.test(f[i])) el += f[i++];
    return el;
  }

  function readNum() {
    let num = '';
    while (i < f.length && /\d/.test(f[i])) num += f[i++];
    return num ? +num : 0;
  }

  function isDigit(ch) {
    return /\d/.test(ch);
  }

  return parseExpr();
}

// Fetch and display structure image from PubChem
async function fetchImage(formula) {
  const img = $("molImg");
  img.style.display = 'none';

  try {
    const cidApi = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${encodeURIComponent(formula)}/cids/JSON`;
    const cidData = await fetch(cidApi).then(r => r.json());
    const cid = cidData.IdentifierList?.CID?.[0];
    if (!cid) return;

    img.src = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`;
    img.onload = () => img.style.display = 'block';
  } catch {
  }
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  $("themeToggle").textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Load theme from storage
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = $("themeToggle");
    if (btn) btn.textContent = "☀️ Light Mode";
  }
})();

// Add entry to localStorage history
function addToHistory(input, result, pinned = false) {
  if (!input || !result) return;

  const normalizedInput = normalizeInput(input);
  const entry = { input: normalizedInput, result, pinned };
  const history = JSON.parse(localStorage.getItem("molarHistory") || "[]");

  const filtered = history.filter(
    e => normalizeInput(e.input) !== normalizedInput || e.result !== result
  );

  filtered.unshift(entry);
  if (filtered.length > 50) filtered.pop();

  localStorage.setItem("molarHistory", JSON.stringify(filtered));
  renderHistory();
}

// Render the history list
function renderHistory() {
  const list = $("historyList");
  const history = JSON.parse(localStorage.getItem("molarHistory") || "[]");

  list.innerHTML = "";

  const pinned = history.filter(e => e.pinned);
  const regular = history.filter(e => !e.pinned);

  [...pinned, ...regular].forEach(entry => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${entry.input} → ${entry.result} g/mol`;
    span.onclick = () => {
      $("inp").value = entry.input;
      go();
    };

    const pinBtn = document.createElement("button");
    pinBtn.className = "pin";
    pinBtn.innerText = entry.pinned ? "★" : "☆";
    pinBtn.onclick = (e) => {
      e.stopPropagation();
      togglePin(entry);
    };

    li.appendChild(span);
    li.appendChild(pinBtn);
    list.appendChild(li);
  });

  updateAutocomplete();
}

// Toggle pin on a history item
function togglePin(target) {
  let history = JSON.parse(localStorage.getItem("molarHistory") || "[]");

  history = history.map(e =>
    e.input === target.input && e.result === target.result
      ? { ...e, pinned: !e.pinned }
      : e
  );

  localStorage.setItem("molarHistory", JSON.stringify(history));
  renderHistory();
}

// Clear all history
function clearHistory() {
  localStorage.removeItem("molarHistory");
  renderHistory();
}

// Normalize user input to avoid duplicates in history
function normalizeInput(str) {
  return str
    .trim()
    .replace(/^\((.*)\)$/, "$1")
    .replace(/^\[(.*)\]$/, "$1")
    .replace(/\s+/g, '');
}

// Shows the credits
function showCredits() {
  document.getElementById("creditsModal").style.display = "flex";
}

// Hides the credits
function closeCredits() {
  document.getElementById("creditsModal").style.display = "none";
}

// Populates the autocomplete suggestion list with unique formulas from history
function updateAutocomplete() {
  const history = JSON.parse(localStorage.getItem("molarHistory") || "[]");
  const datalist = $("suggestions");

  datalist.innerHTML = "";

  const uniqueInputs = [...new Set(history.map(entry => entry.input))];

  uniqueInputs.forEach(input => {
    const option = document.createElement("option");
    option.value = input;
    datalist.appendChild(option);
  });
}

// Computes between moles and mass 
function updateConverter() {
  const molarMass = parseFloat($("mmInput").value);
  const value = parseFloat($("valueInput").value);
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const output = $("convResult");

  if (!molarMass || !value) {
    output.textContent = "";
    return;
  }

  let result = 0;
  if (mode === "toMass") {
    result = value * molarMass;
    output.textContent = `${result.toFixed(3)} g`;
  } else {
    result = value / molarMass;
    output.textContent = `${result.toFixed(3)} mol`;
  }
}

["mmInput", "valueInput"].forEach(id =>
  $(id).addEventListener("input", updateConverter)
);
document.querySelectorAll('input[name="mode"]').forEach(el =>
  el.addEventListener("change", updateConverter)
);

// Gets the IUPAC and common name of the molecule
async function fetchName(formula) {
  const nameEl = $("molName");
  nameEl.textContent = "Looking up name...";

  try {
    const cidApi = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${encodeURIComponent(formula)}/cids/JSON`;
    const cidData = await fetch(cidApi).then(r => r.json());
    const cid = cidData.IdentifierList?.CID?.[0];
    if (!cid) {
      nameEl.textContent = "No name found.";
      return;
    }

    const synonymApi = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`;
    const synonymData = await fetch(synonymApi).then(r => r.json());
    const synonyms = synonymData.InformationList?.Information?.[0]?.Synonym;
    const commonName = synonyms?.[0]
      ? synonyms[0].charAt(0).toUpperCase() + synonyms[0].slice(1).toLowerCase()
      : null;

    const iupacApi = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName/JSON`;
    const iupacData = await fetch(iupacApi).then(r => r.json());
    const rawIupac = iupacData.PropertyTable?.Properties?.[0]?.IUPACName;

    const iupacName = rawIupac
      ? rawIupac.charAt(0).toUpperCase() + rawIupac.slice(1).toLowerCase()
      : null;

    if (commonName || iupacName) {
      nameEl.innerHTML = `
        ${commonName ? `<strong>Common:</strong> ${commonName}<br>` : ""}
        ${iupacName ? `<strong>IUPAC:</strong> ${iupacName}` : ""}
      `;
    } else {
      nameEl.textContent = "Name not available.";
    }
  } catch {
    nameEl.textContent = "Error retrieving name.";
  }
}

renderHistory(); // Initial render of history and autocomplete on page load