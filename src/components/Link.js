import { h, app } from "hyperapp";

const doClick = (go, to) => event => {
  event.preventDefault();
  go(to);
};

export default ({ actions, to }, children) => {
  const click = doClick(actions.router.go, to);
  return (
    <a href={to} onclick={click}>
      {children}
    </a>
  );
};
