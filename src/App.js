import { Button, Input, List, message } from "antd";
import { useState } from "react";
import Presets, { options } from './components/Presets'
import * as API from "./service/api";
import "./index.css";
import "antd/dist/antd.css";

const { TextArea } = Input;
const defaultData = [];

const defaultPrompt = options[0]

export default function App() {
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState(defaultData)

  const fetchAPI = () => {
    setLoading(true)
    API.fetchOpenAI(prompt)
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          message.error(res.error.message)
          return
        }
        setListData([
          {
            prompt,
            response: res.choices[0].text,
          },
          ...listData,
        ])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const handleOnChange = (e) => {
    setPrompt(e.target.value)
  }


  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <div style={{position: 'relative',  textAlign: 'right'}}>
        <TextArea 
          onChange={handleOnChange}
          value={prompt}
          rows={8} 
        />

        <Presets setPrompt={setPrompt} />
        <Button 
          type="primary"
          style={{ margin: '30px 0px', }}
          onClick={fetchAPI} 
          loading={loading}>Submit
        </Button>
      </div>

      <List
        bordered
        dataSource={listData}
        renderItem={(item) => (
        <List.Item>
            <div>
            <ListConetnt title={"Prompt"} content={item.prompt} />
            <ListConetnt title={"Response"} content={item.response} />
            </div>
        </List.Item>
        )}
      />
    </div>
  );
}


const ListConetnt = ({ title, content }) => {
  return (
    <>
    <h3 
      style={{
        width: 200, 
        display: 'inline-block', 
        verticalAlign: 'top'
      }}>
      {title}:
    </h3>
    <p style={{display: 'inline-block', width: 360}}>{content}</p>
    </>
  )
}