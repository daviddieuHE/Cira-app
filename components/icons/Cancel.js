import * as React from "react";
import Svg, { Ellipse, Path } from "react-native-svg";
const Cancel = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={103}
    height={102}
    fill="none"
    {...props}
  >
    <Ellipse cx={51.5} cy={51} fill="#B94919" rx={51.5} ry={51} />
    <Path
      fill="#fff"
      d="M63.272 68h-4.848L49.64 53.936h-.096L40.76 68h-4.608l10.944-17.04L36.44 34.496h4.848l8.4 13.344h.096l8.592-13.344h4.608l-10.752 16.32L63.272 68Z"
    />
  </Svg>
)
export default Cancel;
