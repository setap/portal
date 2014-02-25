//Таким образом обходим баг (см. https://github.com/joeferner/node-oracle/issues/109)
// связанный с передачерй кириллицы в CLOB из
// Oracle через node-oracle driver (https://github.com/joeferner/node-oracle)


//Самый простой перевод в верхнем регистре
//АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЭЫЬЮЯ => ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567

module.exports = function translite(str) {
  var alph = {
    A: "А",
    B: "Б",
    C: "В",
    D: "Г",
    E: "Д",
    F: "Е",
    G: "Ё",
    H: "Ж",
    I: "З",
    J: "И",
    K: "Й",
    L: "К",
    M: "Л",
    N: "М",
    O: "Н",
    P: "О",
    Q: "П",
    R: "Р",
    S: "С",
    T: "Т",
    U: "У",
    V: "Ф",
    W: "Х",
    X: "Ц",
    Y: "Ч",
    Z: "Ш",
    1: "Щ",
    2: "Ъ",
    3: "Э",
    4: "Ы",
    5: "Ь",
    6: "Ю",
    7: "Я",
    ' ': " ",
    '.': ".",
    '-': "-"
  }
  var translatedString = '';
  for (var i = 0; i < str.length; i++) {
    translatedString += alph[str[i]];
  }
  return translatedString;
}

