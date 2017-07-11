import { h, app } from "hyperapp";
import Link from "./Link";

export default ({ state, actions }) => {
  return (
    <ul>
      <li>
        <Link actions={actions} to="/">
          {"Home"}
        </Link>
      </li>
      <li>
        <Link actions={actions} to="/counters">
          {"Counters"}
        </Link>
      </li>
    </ul>
  );
};
