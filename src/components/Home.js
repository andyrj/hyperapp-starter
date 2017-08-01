import { h } from "hyperapp";
import Header from "./Header";

export default (state, actions) => {
  return (
    <body>
      <div>
        <Header state={state} actions={actions} />
        <p>
          {"Hello World!..."}
        </p>
      </div>
    </body>
  );
};
