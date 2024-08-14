/* Function author Andrea*/

export function upperCaseString(string) {
  const newString = string
    .split("-")
    .map((element) => {
      let newElement = ""

      for (let i = 0; i < element.length; i++) {
        if (i === 0) {
          newElement += element[i].toUpperCase()
        } else {
          newElement += element[i]
        }
      }

      return newElement
    })
    .join(" ");
  return newString;
}
