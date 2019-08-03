﻿import * as React from "react";

interface Props {
  listCount: number;
};

export const Oneliner = (props: Props) =>
  props.listCount > 0
    ? <p className="ml-2 mr-2">
      The independent, comprehensive directory of <strong>{props.listCount.toLocaleString()}</strong> filter and host lists for advertisements, trackers, malware, and annoyances.
      </p>
    : <p className="ml-2 mr-2">
      The independent, comprehensive directory of filter and host lists for advertisements, trackers, malware, and annoyances.
      </p>;