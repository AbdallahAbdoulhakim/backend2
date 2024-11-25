// const hasOwnDeepProperty = (obj, prop) => {
//   let deepestChild = 0;
//   if (typeof obj === "object" && obj !== null) {
//     if (obj.hasOwnProperty(prop)) {
//       deepestChild++;
//     }
//     for (var p in obj) {
//       if (
//         obj.hasOwnProperty(p) && // and as soon as you find the property you are looking for, return true
//         hasOwnDeepProperty(obj[p], prop)
//       ) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

const checkDeepestProperty = (obj, prop) => {
  let deepestChild = 0;
  if (obj !== null) {
    if (obj[prop]) {
      deepestChild = deepestChild + 1;
      console.log(deepestChild);
    }
  }
  return deepestChild;
};

const formattedMenu = (menuArr) => {
  menuArr.forEach((menuItem) => {
    const a = checkDeepestProperty(menuItem, "parent");
    console.log(a);
  });
};

module.exports = { formattedMenu };
