export function formatDate(dateStr = "") {
  return dateStr.slice(0, 10);
}

export function textTruncate(str = "", maxLength) { 
  if (!maxLength || str.length < maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

// export function ValidateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }
