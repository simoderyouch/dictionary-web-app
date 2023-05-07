
import { useSelector } from "react-redux";
import Header from "./component/header";
import Form from "./component/form";
import Result from "./component/result";
import Loading from "./component/loader";

function App() {
  const { font } = useSelector((state) => state.font);
  const { data, loading, error } = useSelector((state) => state.data);
 
  return (
    <div className={font}>
      <div className="container">
        <Header />
        <Form/>
        <Loading loading={loading} error={error} data={data}> 
           <Result data={data}/> 
         </Loading> 
      </div>
    </div>
  );
}

export default App;
