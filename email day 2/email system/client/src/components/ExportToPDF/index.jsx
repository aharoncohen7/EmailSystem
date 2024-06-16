import React, { useContext, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PopupContext } from '../../App';
import styles from './style.module.css'
import { formatDateTime } from '../../helpers';

const ExportToPdf = ({ chat }) => {
  const { setPopUpContent } = useContext(PopupContext)
  const pdfRef = useRef();

  const handleGeneratePdf = async () => {
    const element = pdfRef.current;
    // const canvas = await html2canvas(element);
    const canvas = await html2canvas(element, {useCORS: true});
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`chat-${chat._id}.pdf`);
    setPopUpContent(null)

  };

  return (


    <div>
      <div className={styles.msg}>Preview</div>
      <div ref={pdfRef} className={styles.main}>
        <h3>{chat.subject}</h3>
        {chat.msg.map((msg, index) => (
          <span key={index}>
            <span className={styles.date}>{formatDateTime(msg.date)}</span>
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
          </span>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.button1} onClick={handleGeneratePdf}>Generate PDF</button>
        <button className={styles.button2} onClick={() => setPopUpContent(null)} >Cancel</button>
      </div>
    </div>
  );
};

export default ExportToPdf;
