
import DomPurify from 'dompurify';

import styles from './style.module.css'
import React from 'react'

const MsgContent = ({ msgContent }) => {
    // קבלת כיוון הטקסט מהתוכן כדי להחילו על האלמנט העוטף

    // ניטור הודעה
    const sanitizedHTML = DomPurify.sanitize(msgContent);
    // אפשרויות להגבלות נוספות
    // const sanitizedHTML = DomPurify.sanitize(msg.content, {
    //   ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    //   ALLOWED_ATTR: ['style'],
    // });

    // הודעה לדוגמה- למחוק
    const htmlString = `<span  
  dir="rtl"
   style=
  "text-decoration: none;
  font-style: normal;
  font-weight: normal;
  text-align: center;" 
> what is <span style="color: yellow;">your</span> <span style="color: green;">favorite</span> ? </span>
</span>`;

    function getTextStyles(content) {
        const textAlignMatch = content.match(/text-align:\s*(\w+)/);
        const TextDirectionMatch = content.match(/dir:\s*(\w+)/);

        if (textAlignMatch && TextDirectionMatch) {
            return {
                textAlign: textAlignMatch[1],
                dir: TextDirectionMatch[1]
            };
        } else {
            const hebrewCharacters = content.replace(/[^א-ת]/g, '');
            const isHebrew = hebrewCharacters.length / content.length > 0.5;

            return {
                textAlign: textAlignMatch ? textAlignMatch[1] : (isHebrew ? "right" : "left"),
                dir: TextDirectionMatch ? TextDirectionMatch[1] : (isHebrew ? "rtl" : "ltr")
            };
        }
    }




    return (
        <>
            <div className={styles.content}
                style={getTextStyles(sanitizedHTML)}
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

        </>
    )
}

export default MsgContent
