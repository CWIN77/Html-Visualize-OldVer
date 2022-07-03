import { color } from "./color"

const Comp: string = `
  <input type='text' placeholder='플레이스홀더!!' 
    style='
    width:calc(100% - 24px - 24px);
    background-color: ${color.black}; 
    font-size: 14px; 
    padding: 12px; 
    margin: 12px; 
    border-radius: 4px; 
    color: ${color.white};
    ' 
  />
`

export default Comp