// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

/**
 * A custom hook to implement an animationend listener on the provided ref
 * @param {object} ref - A reference to a DOM element to add the listener to
 * @param {function} callback - A callback function that will be run for matching animation events
 * @param {string} animationName - The name of the animation to listen for
 * @param {boolean} listenForEventBubbling - A parameter that when true, listens for events on the target element and
 *   bubbled from all descendent elements but when false, only listens for events coming from the target element and
 *   ignores events bubbling up from descendent elements
 */
function useAnimationEnd(
  ref,
  callback,
  animationName,
  listenForEventBubbling = true,
) {
  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    function handleAnimationend(event) {
      if (!listenForEventBubbling && event.target !== ref.current) {
        return;
      }
      if (animationName && animationName !== event.animationName) {
        return;
      }
      callback(event);
    }

    ref.current.addEventListener('animationend', handleAnimationend);

    return () => {
      ref.current.removeEventListener('animationend', handleAnimationend);
    };
  }, [ref, callback, animationName, listenForEventBubbling]);
}

export default useAnimationEnd;
