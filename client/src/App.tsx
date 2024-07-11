import FormWithReactHookFormAndZod from "./pages/form-with-rfh-and-zod";
import FormWithReactHookForm from "./pages/form-with-rfh-and-zod";
import FormWithoutReactHookForm from "./pages/form-with-rfh-and-zod";

const App = () => {
  return (
    <div className="container">
      {/* <FormWithoutReactHookForm /> */}
      {/* <FormWithReactHookForm /> */}
      <FormWithReactHookFormAndZod />
    </div>
  );
};

export default App;
