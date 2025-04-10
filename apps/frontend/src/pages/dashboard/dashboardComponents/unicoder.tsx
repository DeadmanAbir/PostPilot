// UnicodeConverter.js
const UnicodeConverter = {
  bold: function(text) {
    return text.replace(/[0-9A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 48 && code <= 57) { // 0-9
        return String.fromCodePoint(code + 120734);
      } else if (code >= 65 && code <= 90) { // A-Z
        return String.fromCodePoint(code + 120211);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCodePoint(code + 120205);
      }
      return char;
    });
  },
  
  italic: function(text) {
    return text.replace(/[A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCodePoint(code + 120263);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCodePoint(code + 120257);
      }
      return char;
    });
  },
  
  boldItalic: function(text) {
    return text.replace(/[A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCodePoint(code + 120315);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCodePoint(code + 120309);
      }
      return char;
    });
  }
};

export default UnicodeConverter;
