import React from "react";

import UpArrow from "./UpArrow";
import DownArrow from "./DownArrow";
import CheckedCircle from "./CheckedCircle";
import EmptyCircle from "./EmptyCircle";
import FilledRadio from "./FilledRadio";
import EmptyRadio from "./EmptyRadio";
import FullStar from './FullStar';
import HalfStar from './HalfStar';
import EmptyStar from './EmptyStar';

const Icon = props => {
  switch (props.name) {
    case "upArrow":
      return <UpArrow {...props} />;
    case "downArrow":
      return <DownArrow {...props} />;
    case "checkedCircle":
      return <CheckedCircle {...props} />;
    case "emptyCircle":
      return <EmptyCircle {...props} />;
    case "emptyRadio":
      return <EmptyRadio {...props} />;
    case "filledRadio":
      return <FilledRadio {...props} />;
    case "fullStar":
      return <FullStar {...props} />;
    case "halfStar":
      return <HalfStar {...props} />;
    case "emptyStar":
      return <EmptyStar {...props} />;
    default:
      return;
  }
};

export default Icon;
