import Slideshow from "./ui/Slideshow";
import { pgConnect, testDbConnection} from "./lib/database";

testDbConnection();

const Page = () => {
  return(
    <Slideshow />
  );
};

export default Page;
