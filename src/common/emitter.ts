import mitt from "mitt";

type Events = {
  mapClick: number[];
};

export const emitter = mitt<Events>();
