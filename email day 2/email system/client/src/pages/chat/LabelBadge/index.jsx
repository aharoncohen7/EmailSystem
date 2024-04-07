import React from 'react';
import styles from './style.module.css';
import Colors from '../Colors';

const myColors = ["red", "green", "blue", "yellow", "pink", "purple", "brown", "rgba(253, 94, 94, 1)"];

const LabelBadge = ({ color = "rgb(166, 184, 212)" }) => {
    const [colorLabel, setColorLabel] = React.useState(color);
    const [showColors, setShowColors] = React.useState(false);
    const [showLabel, setShowLabel] = React.useState(true);

    return (
        showLabel ? (
            <div className={styles.main} onClick={() => setShowColors(!showColors)}>
                <div style={{ backgroundColor: colorLabel }} className={styles.rectangle}>
                    <span className={styles.x} onClick={() => setShowLabel(false)}>x</span>
                </div>
                <div style={{ backgroundColor: colorLabel }} className={styles.triangle}></div>
                {showColors && <Colors setColor={setColorLabel} setShowColors={setShowColors}/>}
            </div>
        ) : null
    );
};

export default LabelBadge;
