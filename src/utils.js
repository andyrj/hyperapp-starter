'use strict';

export const DEV = process.env.NODE_ENV !== 'production';
export const SERVER = process.env.BUILD_TARGET === 'server';
