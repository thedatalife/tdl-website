/* @flow */

import 'app.css';

function foo(one: any, two: number, three?): string {
  const safeThree = three || 'three';
  return `hello world ${one} ${two} ${safeThree.toString()}`;
}
