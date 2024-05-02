
import DomPurify from 'dompurify';
import styles from './style.module.css'
import React from 'react'
import { changeColorLinks } from '../../helpers';


   // הודעה לדוגמה- למחוק
   const htmlString = `<span  
   dir="rtl"
    style=
   "text-decoration: none;
   font-style: normal;
   font-weight: normal;
   text-align: right;" 
 > what is <span style="color: yellow;">your</span> <span style="color: green;">זהו טקסט עם קישור: https://example.com אני מקווה שהקישור הזה יוצג בצבע כחול.</span> ? </span>
     </span>`;

const MsgContent = ({ msgContent }) => {
    // קבלת כיוון הטקסט מהתוכן כדי להחילו על האלמנט העוטף
    function getTextStyles(content) {
        const textAlignMatch = content.match(/text-align:\s*(\w+)/);
        const TextDirectionMatch = content.match(/<[^>]+dir=["'](\w+)["'][^>]*>/);

        // const TextDirectionMatch = content.match(/dir:\s*(\w+)/);

        if (textAlignMatch && TextDirectionMatch) {
            return {
                textAlign: textAlignMatch[1],
                dir: TextDirectionMatch[1]
            };
        } else {
            console.log(content);
            const hebrewCharacters = content.replace(/[^א-ת]/g, '');
            const isHebrew = hebrewCharacters.length / content.length > 0.5;

            return {
                textAlign: isHebrew ? "right" : "left",
                dir: isHebrew ? "rtl" : "ltr"
            };
        }
    }
    // ניטור הודעה
    const sanitizedHTML = DomPurify.sanitize(msgContent);
    
    // אפשרויות להגבלות נוספות
    // const sanitizedHTML = DomPurify.sanitize(msg.content, {
    //   ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    //   ALLOWED_ATTR: ['style'],
    // });


//  console.log(changeColorLinks(sanitizedHTML));




    return (
        <>
          
                <div className={styles.content}
                style={getTextStyles(sanitizedHTML)}
                dangerouslySetInnerHTML={{ __html: changeColorLinks(sanitizedHTML) }} />


        </>
    )
}

export default MsgContent


// גירסה אחרת שמחזירה מבנה נתונים
// const htmlString = `<span dir='rtl' style="text-decoration: underline; font-style: normal; font-weight: bold; text-align: right"; color: red;> <span style="text-decoration: none; font-weight: normal; color: blue;">נסיון</span><span style="text-decoration: underline; font-weight: bold; color: red;"> חדש</span><span style="text-decoration: none; font-weight: normal; color: brown;"></span> <span style="text-decoration: none; font-weight: normal; color: yellow;">בשינוי</span><span style="text-decoration: none; font-weight: normal; color: red;"> </span><span style="text-decoration: none; font-weight: bold; color: blue;">צבעים <span style="text-decoration: none; font-weight: bold; color: red;">והדגשות<span style="text-decoration: none; font-weight: bold; color: red;">​</span><span style="text-decoration: none; font-weight: bold; color: red;">​</span></span></span><span style="text-decoration: none; font-weight: normal; color: green;"><span style="text-decoration: none; font-weight: normal; color: green;"></span></span> </span>`;

// const formattedContent = htmlToFormattedContent(htmlString);
// console.log(formattedContent);
// function htmlToFormattedContent(html) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
  
//     function convertNodeToObject(node) {
//       if (node.nodeType === Node.TEXT_NODE) {
//         return { type: 'text', content: node.textContent };
//       }
  
//       const styles = {};
//       const computedStyles = window.getComputedStyle(node);
//       for (let i = 0; i < computedStyles.length; i++) {
//         const style = computedStyles[i];
//         styles[style] = computedStyles.getPropertyValue(style);
//       }
  
//       const children = Array.from(node.childNodes).map(convertNodeToObject);
//       return {
//         type: node.tagName.toLowerCase(),
//         styles,
//         content: node.textContent,
//         children: children.length > 0 ? children : undefined,
//       };
//     }
  
//     const formattedContent = convertNodeToObject(doc.body);
//     return formattedContent.children[0];
//   }

//   const MsgContent = ({  }) => {
//     const renderContent = (contentItem) => {
//       const { type, styles, content, children } = contentItem;
//       return (
//         <span style={styles}>
//           {content}
//           {children && children.map((child, index) => renderContent(child, index))}
//         </span>
//       );
//     };
  
//     return <div className={styles.content}>{renderContent(formattedContent)}</div>;
//   };
//   export default MsgContent