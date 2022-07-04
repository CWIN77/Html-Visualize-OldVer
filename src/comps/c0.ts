import { color } from "./compValue"

const Comp = `
  <input placeholder="Placeholder" type="text"
    style="
      width: calc((100% - 24px) - 24px);
      height: auto;
      background-color: ${color.black}; 
      font-size: 14px; 
      padding: 12px; 
      margin: 12px; 
      border-radius: 4px; 
      color: ${color.white};
    "
  />
`
export default Comp