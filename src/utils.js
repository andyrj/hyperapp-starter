"use strict";

export const DEV = process.env.NODE_ENV !== "production";
export const SERVER = process.env.BUILD_TARGET === "server";

export const randomString = function(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
