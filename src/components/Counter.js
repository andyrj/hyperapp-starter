import { h } from "hyperapp";

export default ({ id, inc, dec, rem }, children) => {
  return (
    <div>
      <button onclick={rem}>X</button>
      <span>
        {children}
      </span>
      <button onclick={inc}>+</button>
      <button onclick={dec}>-</button>
    </div>
  );
};
