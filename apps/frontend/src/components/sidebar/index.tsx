import { Navigation } from "./navigation";
import Profile from "./profile";
import Toggle from "./toggle";
import { Wrapper } from "./wrapper";

const Sidebar = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-between  h-full">
        <div>
          <Toggle />
          <Navigation />
        </div>
        <Profile />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
