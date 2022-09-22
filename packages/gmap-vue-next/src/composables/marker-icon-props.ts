export function getMarkerIconEvents(
  type?: 'events' | 'manual' | 'props'
): string[] {
  const events = [
    'click',
    'rightclick',
    'dblclick',
    'drag',
    'dragstart',
    'dragend',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
  ];
  const manual = ['update:position'];
  const props = [
    'getAnimation',
    'setAnimation',
    'getClickable',
    'setClickable',
    'getCursor',
    'setCursor',
    'getDraggable',
    'setDraggable',
    'getIcon',
    'setIcon',
    'getLabel',
    'setLabel',
    'getOpacity',
    'setOpacity',
    'getPosition',
    'setPosition',
    'getShape',
    'setShape',
    'getTitle',
    'setTitle',
    'getVisible',
    'setVisible',
    'getZIndex',
    'setZIndex',
  ];

  switch (type) {
    case 'events':
      return events;
    case 'manual':
      return manual;
    case 'props':
      return props;
    default:
      return [...events, ...manual, ...props];
  }
}

export function getMarkerIconProps() {
  return {
    animation: {
      twoWay: true,
      type: Number,
    },
    attribution: {
      type: Object,
    },
    clickable: {
      type: Boolean,
      twoWay: true,
      default: true,
    },
    cursor: {
      type: String,
      twoWay: true,
    },
    draggable: {
      type: Boolean,
      twoWay: true,
      default: false,
    },
    icon: {
      twoWay: true,
    },
    label: {},
    opacity: {
      type: Number,
      default: 1,
    },
    options: {
      type: Object,
    },
    place: {
      type: Object,
    },
    position: {
      type: Object,
      twoWay: true,
    },
    shape: {
      type: Object,
      twoWay: true,
    },
    title: {
      type: String,
      twoWay: true,
    },
    zIndex: {
      type: Number,
      twoWay: true,
    },
    visible: {
      twoWay: true,
      default: true,
    },
  };
}
