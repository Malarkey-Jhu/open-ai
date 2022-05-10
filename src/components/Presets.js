
import { Select } from 'antd';

const { Option } = Select;

export const options = [
 `Translate this into 1. French, 2. Spanish and 3. Japanese: \nWhat rooms do you have available? \n`,
  `Translate this into 1. Chinese, 2.Japanese: \nMy name is Jack! \n`,
  `Translate this into Japanese: \nHow are you doing? \n`,
]

const PresetSelect = ({ setPrompt }) => {
  function handleChange(value) {
    setPrompt(value)
  }

  return (
    <>
    <span>prompt preset:</span>
    <Select 
      defaultValue={options[0]} 
      style={{ margin: '0 10px' }} 
      onChange={handleChange}
    >
      {
        options.map((op, key) => (
          <Option value={op}>preset {key+1}</Option>
        ))
      }
    </Select>
    </>
  )
}

export default PresetSelect