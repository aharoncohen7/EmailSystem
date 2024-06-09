import axios from "axios"
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//     cloud_name: "dmenvz22i",
//     api_key: "553257966128894",
//     api_secret: "9WlXc0XhU7tIUe5xKxkY5rChoIU"
// })



// export const saveImgToCloud = async (img) => {
//     console.log(img)
    
//     const arrayBuffer = await img.arrayBuffer()
//     const buffer = new Uint8Array(arrayBuffer)
//     const imgLink = new Promise((res) => {
//         cloudinary.uploader.upload_stream({ folder: "avatarImage" }, (err, uploadRes) => {
//             return res(uploadRes)
//         }).end(buffer)
//     }).then(uploadedImg => {
//         return uploadedImg.url
//     })
//     return imgLink
// }


// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: "dmenvz22i", 
//         api_key: "553257966128894", 
//         api_secret: "<your_api_secret>" // Click 'View Credentials' below to copy your API secret
//     });
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();


//מחיקת תגיות ריקות 
function removeEmptyTags(htmlString) {
    const emptyTagRegex = /<(\w+)([^>]*?)>(?:\s*(<\/\1>))?/g;
    return htmlString.replace(emptyTagRegex, "");
}


//מחיקת תגיות ריקות ומיותרות
    function removeSafeEmptyTags(htmlString) {
        // Use a DOM parser to create a DOM tree from the HTML string.
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
      
        // Iterate over all nodes in the DOM tree.
        const nodes = doc.querySelectorAll("*");
        for (const node of nodes) {
          // Check if the node is an empty tag.
          if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim() === "") {
            // Determine if removing the node would affect the formatting.
            const parentNode = node.parentNode;
            const previousSibling = node.previousSibling;
            const nextSibling = node.nextSibling;
      
            // Check if the parent has other child nodes or is an inline element.
            const hasOtherChildren = parentNode.childNodes.length > 1;
            const isInlineElement = ["span", "a", "b", "i", "u"].includes(parentNode.tagName.toLowerCase());
      
            // Check if the previous or next sibling is a non-empty text node.
            const hasNonEmptyPreviousSibling = previousSibling && previousSibling.nodeType === Node.TEXT_NODE && previousSibling.textContent.trim() !== "";
            const hasNonEmptyNextSibling = nextSibling && nextSibling.nodeType === Node.TEXT_NODE && nextSibling.textContent.trim() !== "";
      
            // If the node can be safely removed without affecting formatting, remove it.
            if (
              (!hasOtherChildren || isInlineElement) &&
              (!hasNonEmptyPreviousSibling || !hasNonEmptyNextSibling)
            ) {
              parentNode.removeChild(node);
            }
          }
        }
      
        // Convert the modified DOM tree back to an HTML string.
        const serializer = new XMLSerializer();
        return serializer.serializeToString(doc);
      }

    



// בקשת שרת גנרית
export const axiosReq = async ({ method = 'POST', body, url }) => {
    try {
       // axios.defaults.baseURL = 'http://localhost:4000/api/'
       console.log('api req 😘 \n', { url, method, body })
       
       const { data: result } = await axios({
          baseURL: 'http://localhost:4004/api/',
          method,
          data: body || {},
          url,
          headers: {
             Authorization: localStorage.token || ''
          }
       })
       
       console.log('api req result 🐱 \n', { result })
 
 
       return result;
 
    } catch (error) {
       console.log('api error 🤢 \n', { error })
       throw error.response?.data?.my  ? error.response?.data?.message || 'something went wrong' : 'something went wrong'
    }
 }


// פונקציה לקבלת תיאור יחסי לתאריך
function getRelativeDate(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const oneWeek = 7 * oneDay; // milliseconds in a week

    if (timeDifference < oneDay) {
        return "Today";
    } else if (timeDifference < 2 * oneDay) {
        return "Yesterday";
    } else if (timeDifference < oneWeek) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[inputDate.getDay()];
    } else {
        return "Last week";
    }
}

// פונקציה לקבלת השעה במבנה של 00:00
function getTime(timeString) {
    const parts = timeString.split("T")[1].split(":");
    const hours = parts[0].padStart(2, "0");
    const minutes = parts[1].padStart(2, "0");
    return `${hours}:${minutes}`;
}

// פונקציה לקבלת התאריך במבנה של כיוונית 23/04/24
function getDate(dateString) {
    const parts = dateString.split("T")[0].split("-");
    const year = parts[0].slice(-2);
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}

// פונקציה המשלבת את תוצאות שלשת הפונקציות הקודמות 
export function formatDateTime(dateTimeString) {
    const relativeDate = getRelativeDate(dateTimeString);
    const time = getTime(dateTimeString);
    const date = getDate(dateTimeString);
    return `${relativeDate}, ${date}, ${time}`;
}



export function getDescriptionOrTime(timeString) {
    const currentDate = new Date();
    const inputDate = new Date(timeString);
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    if (timeDifference < oneDay) {
        const parts = timeString.split("T")[1].split(":");
        const hours = parts[0].padStart(2, "0");
        const minutes = parts[1].padStart(2, "0");
        return `${hours}:${minutes}`;
    } else {
        return getRelativeDate(timeString);
    }
}


export function changeColorLinks(htmlString){
const linkRegex = /https?:\/\/[^<\s]+/gi;

// מציאת כל הקישורים בתוך הטקסט
const links = htmlString.match(linkRegex);

// החלת סגנון CSS על כל קישור בתוך הטקסט
const coloredText = htmlString.replace(linkRegex, '<a href="$&" style="color: #00A389;" target="_blank">$&</a>');
return coloredText 
}








// export function formatDateTime(dateTimeString){
//     var parts = dateTimeString.split("T"); // מפרק את המחרוזת לשני חלקים על פי התו 'T'
//     var datePart = parts[0]; // חלק הראשון שמכיל את התאריך
//     var timePart = parts[1]; // חלק השני שמכיל את השעה

//     // מפרקים את התאריך לשנה, חודש ויום
//     var dateParts = datePart.split("-");
//     var year = dateParts[0].slice(-2); // משנה את השנה לצורת שני ספרות (כך שהתוצאה תהיה "24" במקרה זה)
//     var month = dateParts[1];
//     var day = dateParts[2];
    
//     // מרכיבים מחדש את התאריך בפורמט הרצוי (יום/חודש/שנה)
//     var newDatePart = day + "/" + month + "/" + year;
    
    
//     // מפרקים את החלק השני (שעות, דקות, שניות)
//     var timeParts = timePart.split(":");
//     var hours = timeParts[0];
//     var minutes = timeParts[1];
    
//     // מפרקים את השעות לתצוגה במבנה של ארבע ספרות (כגון "23")
//     hours = hours.padStart(2, "0"); // מוסיף אפס במידה והמספר קטן מ־10
//     var newTimePart = hours + ":" + minutes; // מרכיב מחדש את חלק השעה
//     var newString = newDatePart + ", " + newTimePart; // מרכיב מחדש את המחרוזת החדשה, מופרדת בפסיק
//     var relativeDate = getRelativeDate(dateTimeString); // מרכי�� מחד
//   return relativeDate  + newString
// }




// function getRelativeDate(date) {
//   //השוואה לתאריך עדכני
//   const currentDate = new Date();
//   const inputDate = new Date(date);
//   const timeDifference = currentDate.getTime() - inputDate.getTime();
//   const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
//   const oneWeek = 7 * oneDay; // milliseconds in a week

//   if (timeDifference < oneDay) {
//       return "Today, ";
//   } else if (timeDifference < 2 * oneDay) {
//       return "Yesterday, ";
//   } else if (timeDifference < oneWeek) {
//       // Check the day of the week
//       const daysOfWeek = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "];
//       return daysOfWeek[inputDate.getDay()];
//   } else {
//       return "last week, ";
//   }
// }


 // const someElement = document.createElement('span');
    // someElement.innerHTML = 'חוכמת אתונה';
    // document.body.appendChild(someElement);
    // const direction = window.getComputedStyle(someElement).direction;
    // if (direction === 'rtl') {
    //     // הגדרת המקלדת היא כנראה עברית
    //     console.log("he");
    // } else {
    //     console.log("en");
    //     // הגדרת המקלדת היא כנראה לא עברית
    // }
    // document.body.removeChild(someElement);


    //   window.addEventListener('load', () => {
    //   const userLanguage = navigator.language || navigator.languages[0];

    //   if (userLanguage.startsWith('he')) {
    //     // שפת המקלדת הנוכחית היא עברית
    //     console.log('Hebrew keyboard layout detected');
    //   } else {
    //     // שפת המקלדת הנוכחית היא אנגלית או אחרת
    //     console.log('Non-Hebrew keyboard layout detected');
    //   }
    // });