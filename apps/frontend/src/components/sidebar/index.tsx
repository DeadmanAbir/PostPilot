import { Navigation } from "./navigation"
import Toggle from "./toggle"
import { Wrapper } from "./wrapper"


const Sidebar = () => {
  
  return (
    <Wrapper>
      <Toggle />
      <Navigation/>
    </Wrapper>
  )
}

export default Sidebar