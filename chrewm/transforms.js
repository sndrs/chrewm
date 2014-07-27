// n.b. regexs in the key must be escaped
module.exports = {
  "ing\\b": "un", // *ing > *un
  "(\\w)(one)\\b": "$1ewn", // *one > *ewn - dodgy?
  "own\\b": "ewn", // *own > *ewn
  "ose\\b": "ews", // *ose > *ews
  "iew\\b": "ew" // *iew > *ew
}