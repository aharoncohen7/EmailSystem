import Badge from "./components/Badge";
import Editor from "./components/Editor";
import EmailLi from "./components/EmailLi";
import EmailType from "./components/EmailType";
import InputSearch from "./components/InputSearch";
import LabelBadge from "./components/LabelBadge";
import MainContainer from "./components/MainContainer";

import NewMsgBtn from "./components/NewMsgBtn";
import SendBtn from "./components/SendBtn";

export default function App() {
  return (
    <div >
      {/* <div style={{ display: 'flex' , padding: '8px', width: '800px'}}>
        <img src="./vite.svg" alt="" />
        <div style={{background: 'green', flexGrow: 1}} >
          <h3>Jessica Koel</h3>
          <p>hey jhon...</p>
        </div>
        <div style={{ background: 'red'  }} >
          <p>11:34</p> */}
      {/* <Badge>45</Badge>
      <NewMsgBtn />
      <EmailLi />
      <SendBtn />
      <EmailType />
      <InputSearch />
      <LabelBadge />
      <Editor/> */}

      {/* </div>
      </div> */}

      <MainContainer/>
       
        {/* <Badge>45</Badge>
        <NewMsgBtn />
        <EmailLi />
        <SendBtn />
        <EmailType />
        <InputSearch />
        <LabelBadge />
        <Editor /> */}


     
    </div>
  )
}