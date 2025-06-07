// Data for all elements: symbol, name, atomic number, col, row (period)
const PT_ELEMENTS = [
  // [symbol, name, number, col (1-based), row]
  ["H", "Hydrogen", 1, 1, 1],
  ["He", "Helium", 2, 18, 1],
  ["Li", "Lithium", 3, 1, 2], ["Be", "Beryllium", 4, 2, 2],
  ["B", "Boron", 5, 13, 2], ["C", "Carbon", 6, 14, 2], ["N", "Nitrogen", 7, 15, 2], ["O", "Oxygen", 8, 16, 2], ["F", "Fluorine", 9, 17, 2], ["Ne", "Neon", 10, 18, 2],
  ["Na", "Sodium", 11, 1, 3], ["Mg", "Magnesium", 12, 2, 3],
  ["Al", "Aluminum", 13, 13, 3], ["Si", "Silicon", 14, 14, 3], ["P", "Phosphorus", 15, 15, 3], ["S", "Sulfur", 16, 16, 3], ["Cl", "Chlorine", 17, 17, 3], ["Ar", "Argon", 18, 18, 3],
  ["K", "Potassium", 19, 1, 4], ["Ca", "Calcium", 20, 2, 4], ["Sc", "Scandium", 21, 3, 4], ["Ti", "Titanium", 22, 4, 4], ["V", "Vanadium", 23, 5, 4], ["Cr", "Chromium", 24, 6, 4], ["Mn", "Manganese", 25, 7, 4], ["Fe", "Iron", 26, 8, 4], ["Co", "Cobalt", 27, 9, 4], ["Ni", "Nickel", 28, 10, 4], ["Cu", "Copper", 29, 11, 4], ["Zn", "Zinc", 30, 12, 4],
  ["Ga", "Gallium", 31, 13, 4], ["Ge", "Germanium", 32, 14, 4], ["As", "Arsenic", 33, 15, 4], ["Se", "Selenium", 34, 16, 4], ["Br", "Bromine", 35, 17, 4], ["Kr", "Krypton", 36, 18, 4],
  ["Rb", "Rubidium", 37, 1, 5], ["Sr", "Strontium", 38, 2, 5], ["Y", "Yttrium", 39, 3, 5], ["Zr", "Zirconium", 40, 4, 5], ["Nb", "Niobium", 41, 5, 5], ["Mo", "Molybdenum", 42, 6, 5], ["Tc", "Technetium", 43, 7, 5], ["Ru", "Ruthenium", 44, 8, 5], ["Rh", "Rhodium", 45, 9, 5], ["Pd", "Palladium", 46, 10, 5], ["Ag", "Silver", 47, 11, 5], ["Cd", "Cadmium", 48, 12, 5],
  ["In", "Indium", 49, 13, 5], ["Sn", "Tin", 50, 14, 5], ["Sb", "Antimony", 51, 15, 5], ["Te", "Tellurium", 52, 16, 5], ["I", "Iodine", 53, 17, 5], ["Xe", "Xenon", 54, 18, 5],
  ["Cs", "Cesium", 55, 1, 6], ["Ba", "Barium", 56, 2, 6],
  ["La", "Lanthanum", 57, 3, 6], ["Hf", "Hafnium", 72, 4, 6], ["Ta", "Tantalum", 73, 5, 6], ["W", "Tungsten", 74, 6, 6], ["Re", "Rhenium", 75, 7, 6], ["Os", "Osmium", 76, 8, 6], ["Ir", "Iridium", 77, 9, 6], ["Pt", "Platinum", 78, 10, 6], ["Au", "Gold", 79, 11, 6], ["Hg", "Mercury", 80, 12, 6],
  ["Tl", "Thallium", 81, 13, 6], ["Pb", "Lead", 82, 14, 6], ["Bi", "Bismuth", 83, 15, 6], ["Po", "Polonium", 84, 16, 6], ["At", "Astatine", 85, 17, 6], ["Rn", "Radon", 86, 18, 6],
  ["Fr", "Francium", 87, 1, 7], ["Ra", "Radium", 88, 2, 7],
  ["Ac", "Actinium", 89, 3, 7], ["Rf", "Rutherfordium", 104, 4, 7], ["Db", "Dubnium", 105, 5, 7], ["Sg", "Seaborgium", 106, 6, 7], ["Bh", "Bohrium", 107, 7, 7], ["Hs", "Hassium", 108, 8, 7], ["Mt", "Meitnerium", 109, 9, 7], ["Ds", "Darmstadtium", 110, 10, 7], ["Rg", "Roentgenium", 111, 11, 7], ["Cn", "Copernicium", 112, 12, 7],
  ["Nh", "Nihonium", 113, 13, 7], ["Fl", "Flerovium", 114, 14, 7], ["Mc", "Moscovium", 115, 15, 7], ["Lv", "Livermorium", 116, 16, 7], ["Ts", "Tennessine", 117, 17, 7], ["Og", "Oganesson", 118, 18, 7],
  // Lanthanides
  ["Ce", "Cerium", 58, 4, 9], ["Pr", "Praseodymium", 59, 5, 9], ["Nd", "Neodymium", 60, 6, 9], ["Pm", "Promethium", 61, 7, 9], ["Sm", "Samarium", 62, 8, 9], ["Eu", "Europium", 63, 9, 9], ["Gd", "Gadolinium", 64, 10, 9], ["Tb", "Terbium", 65, 11, 9], ["Dy", "Dysprosium", 66, 12, 9], ["Ho", "Holmium", 67, 13, 9], ["Er", "Erbium", 68, 14, 9], ["Tm", "Thulium", 69, 15, 9], ["Yb", "Ytterbium", 70, 16, 9], ["Lu", "Lutetium", 71, 17, 9],
  // Actinides
  ["Th", "Thorium", 90, 4, 10], ["Pa", "Protactinium", 91, 5, 10], ["U", "Uranium", 92, 6, 10], ["Np", "Neptunium", 93, 7, 10], ["Pu", "Plutonium", 94, 8, 10], ["Am", "Americium", 95, 9, 10], ["Cm", "Curium", 96, 10, 10], ["Bk", "Berkelium", 97, 11, 10], ["Cf", "Californium", 98, 12, 10], ["Es", "Einsteinium", 99, 13, 10], ["Fm", "Fermium", 100, 14, 10], ["Md", "Mendelevium", 101, 15, 10], ["No", "Nobelium", 102, 16, 10], ["Lr", "Lawrencium", 103, 17, 10]
];

// Renders the periodic table in the grid
function renderPT() {
  const grid = document.getElementById("ptGrid");
  grid.innerHTML = "";
  let map = {};

  // Fill elements into a quick lookup for col/row
  PT_ELEMENTS.forEach(([sym, name, num, col, row]) => {
    map[`${col},${row}`] = {sym, name, num};
  });

  // Render main table (rows 1-7, cols 1-18)
  for (let row = 1; row <= 7; row++) {
    for (let col = 1; col <= 18; col++) {
      let cell = document.createElement("div");
      if (map[`${col},${row}`]) {
        const el = map[`${col},${row}`];
        cell.className = "pt-el";
        cell.title = `${el.name} (${el.sym})\nAtomic #${el.num}`;
        cell.innerHTML = el.sym;
        cell.onclick = () => insertSymbol(el.sym);
      } else {
        cell.className = "pt-el empty";
        cell.innerHTML = "&nbsp;";
      }
      grid.appendChild(cell);
    }
  }
  // Spacer
  for (let i = 0; i < 2 * 18; i++) {
    let cell = document.createElement("div");
    cell.className = "pt-el empty";
    grid.appendChild(cell);
  }
  // Lanthanides
  for (let row = 9; row <= 9; row++) {
    for (let col = 4; col <= 17; col++) {
      let cell = document.createElement("div");
      let el = map[`${col},${row}`];
      if (el) {
        cell.className = "pt-el";
        cell.title = `${el.name} (${el.sym})\nAtomic #${el.num}`;
        cell.innerHTML = el.sym;
        cell.onclick = () => insertSymbol(el.sym);
      } else {
        cell.className = "pt-el empty";
        cell.innerHTML = "&nbsp;";
      }
      grid.appendChild(cell);
    }
  }
  // Actinides
  for (let row = 10; row <= 10; row++) {
    for (let col = 4; col <= 17; col++) {
      let cell = document.createElement("div");
      let el = map[`${col},${row}`];
      if (el) {
        cell.className = "pt-el";
        cell.title = `${el.name} (${el.sym})\nAtomic #${el.num}`;
        cell.innerHTML = el.sym;
        cell.onclick = () => insertSymbol(el.sym);
      } else {
        cell.className = "pt-el empty";
        cell.innerHTML = "&nbsp;";
      }
      grid.appendChild(cell);
    }
  }
}

// Inserts the symbol at cursor/caret position in the main input
function insertSymbol(sym) {
  const inp = document.getElementById("inp");
  inp.focus();
  // Insert symbol at caret or append if unfocused
  if (document.activeElement === inp) {
    let start = inp.selectionStart, end = inp.selectionEnd;
    let before = inp.value.substring(0, start);
    let after = inp.value.substring(end);
    inp.value = before + sym + after;
    inp.selectionStart = inp.selectionEnd = start + sym.length;
    if (typeof go === "function") go();
  } else {
    inp.value += sym;
    if (typeof go === "function") go();
  }
}

// Toggle table visibility
function togglePT() {
  const panel = document.getElementById("ptPanel");
  const btn = document.getElementById("ptToggleBtn");
  panel.classList.toggle("hidden");
  if (panel.classList.contains("hidden")) {
    document.getElementById("ptGrid").style.display = "none";
    btn.textContent = "Show";
  } else {
    document.getElementById("ptGrid").style.display = "grid";
    btn.textContent = "Hide";
  }
}

// On page load
window.addEventListener("DOMContentLoaded", () => {
  renderPT();
});