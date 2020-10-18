export function bindEvents(vueInst, googleMapsInst, events) {
  events.forEach((eventName) => {
    if (
      vueInst.$gmapOptions.autobindAllEvents ||
      vueInst.$listeners[eventName]
    ) {
      googleMapsInst.addListener(eventName, (ev) => {
        vueInst.$emit(eventName, ev);
      });
    }
  });
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPropsValues(vueInst, props) {
  return Object.keys(props).reduce((acc, prop) => {
    if (vueInst[prop] !== undefined) {
      acc[prop] = vueInst[prop];
    }
    return acc;
  }, {});
}

// This piece of code was orignally written by sindresorhus and can be seen here
// https://github.com/sindresorhus/lazy-value/blob/master/index.js
export function lazyValue(fn) {
  let called = false;
  let ret;

  return () => {
    if (!called) {
      called = true;
      ret = fn();
    }

    return ret;
  };
}

/**
 * Strips out the extraneous properties we have in our
 * props definitions
 * @param {Object} props
 */
export function mappedPropsToVueProps(mappedProps) {
  return Object.entries(mappedProps)
    .map(([key, prop]) => {
      const value = {};

      if ('type' in prop) value.type = prop.type;
      if ('default' in prop) value.default = prop.default;
      if ('required' in prop) value.required = prop.required;

      return [key, value];
    })
    .reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {});
}

// This piece of code was orignally written by amirnissim and can be seen here
// http://stackoverflow.com/a/11703018/2694653
// This has been ported to Vanilla.js by GuillaumeLeclerc
export function downArrowSimulator(input) {
  // TODO: Analyze disabled eslint rules in the file
  // eslint-disable-next-line no-underscore-dangle -- Is old style should be analyzed
  const _addEventListener = input.addEventListener
    ? input.addEventListener
    : input.attachEvent;

  function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.
    if (type === 'keydown') {
      const origListener = listener;
      // eslint-disable-next-line no-param-reassign -- Is old style this should be analyzed
      listener = (event) => {
        const suggestionSelected =
          document.getElementsByClassName('pac-item-selected').length > 0;
        if (event.which === 13 && !suggestionSelected) {
          const simulatedEvent = document.createEvent('Event');
          simulatedEvent.keyCode = 40;
          simulatedEvent.which = 40;
          origListener.apply(input, [simulatedEvent]);
        }
        origListener.apply(input, [event]);
      };
    }
    _addEventListener.apply(input, [type, listener]);
  }

  // eslint-disable-next-line no-param-reassign -- Is old style this should be analyzed[]
  input.addEventListener = addEventListenerWrapper;
  // eslint-disable-next-line no-param-reassign -- Is old style this should be analyzed[]
  input.attachEvent = addEventListenerWrapper;
}

/**
 * When you have two-way bindings, but the actual bound value will not equal
 * the value you initially passed in, then to avoid an infinite loop you
 * need to increment a counter every time you pass in a value, decrement the
 * same counter every time the bound value changed, but only bubble up
 * the event when the counter is zero.
 *
Example:

Let's say DrawingRecognitionCanvas is a deep-learning backed canvas
that, when given the name of an object (e.g. 'dog'), draws a dog.
But whenever the drawing on it changes, it also sends back its interpretation
of the image by way of the @newObjectRecognized event.

<input
  type="text"
  placeholder="an object, e.g. Dog, Cat, Frog"
  v-model="identifiedObject" />
<DrawingRecognitionCanvas
  :object="identifiedObject"
  @newObjectRecognized="identifiedObject = $event"
  />

new TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
  this.$watch('identifiedObject', () => {
    // new object passed in
    increment()
  })
  this.$deepLearningBackend.on('drawingChanged', () => {
    recognizeObject(this.$deepLearningBackend)
      .then((object) => {
        decrement()
        if (shouldUpdate()) {
          this.$emit('newObjectRecognized', object.name)
        }
      })
  })
})
 */
export function twoWayBindingWrapper(fn) {
  let counter = 0;

  fn(
    () => {
      counter += 1;
    },
    () => {
      counter = Math.max(0, counter - 1);
    },
    () => counter === 0
  );
}

/**
 * Watch the individual properties of a PoD object, instead of the object
 * per se. This is different from a deep watch where both the reference
 * and the individual values are watched.
 *
 * In effect, it throttles the multiple $watch to execute at most once per tick.
 */
export function watchPrimitiveProperties(
  vueInst,
  propertiesToTrack,
  handler,
  immediate = false
) {
  let isHandled = false;

  function requestHandle() {
    if (!isHandled) {
      isHandled = true;
      vueInst.$nextTick(() => {
        isHandled = false;
        handler();
      });
    }
  }

  propertiesToTrack.forEach((prop) => {
    vueInst.$watch(prop, requestHandle, { immediate });
  });
}

/**
 * Binds the properties defined in props to the google maps instance.
 * If the prop is an Object type, and we wish to track the properties
 * of the object (e.g. the lat and lng of a LatLng), then we do a deep
 * watch. For deep watch, we also prevent the _changed event from being
 * emitted if the data source was external.
 */
export function bindProps(vueInst, googleMapsInst, props) {
  Object.keys(props).forEach((attribute) => {
    const { twoWay, type, trackProperties, noBind } = props[attribute];

    if (!noBind) {
      const setMethodName = `set${capitalizeFirstLetter(attribute)}`;
      const getMethodName = `get${capitalizeFirstLetter(attribute)}`;
      const eventName = `${attribute.toLowerCase()}_changed`;
      const initialValue = vueInst[attribute];

      if (typeof googleMapsInst[setMethodName] === 'undefined') {
        throw new Error(
          // TODO: Analyze all disabled rules in the file
          // eslint-disable-next-line no-underscore-dangle -- old code should be analyzed
          `${setMethodName} is not a method of (the Maps object corresponding to) ${vueInst.$options._componentTag}`
        );
      }

      // We need to avoid an endless
      // propChanged -> event emitted -> propChanged -> event emitted loop
      // although this may really be the user's responsibility
      if (type !== Object || !trackProperties) {
        // Track the object deeply
        vueInst.$watch(
          attribute,
          () => {
            const attributeValue = vueInst[attribute];

            googleMapsInst[setMethodName](attributeValue);
          },
          {
            immediate: typeof initialValue !== 'undefined',
            deep: type === Object,
          }
        );
      } else {
        watchPrimitiveProperties(
          vueInst,
          trackProperties.map((prop) => `${attribute}.${prop}`),
          () => {
            googleMapsInst[setMethodName](vueInst[attribute]);
          },
          vueInst[attribute] !== undefined
        );
      }

      if (
        twoWay &&
        (vueInst.$gmapOptions.autobindAllEvents ||
          vueInst.$listeners[eventName])
      ) {
        googleMapsInst.addListener(eventName, () => {
          vueInst.$emit(eventName, googleMapsInst[getMethodName]());
        });
      }
    }
  });
}

export default {
  bindEvents,
  bindProps,
  capitalizeFirstLetter,
  getPropsValues,
  lazyValue,
  mappedPropsToVueProps,
  downArrowSimulator,
  twoWayBindingWrapper,
  watchPrimitiveProperties,
};
