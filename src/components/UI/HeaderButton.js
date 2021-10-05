import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';

import { HeaderButton } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
    return <HeaderButton {...props} iconSize={23} IconComponent={Icon} color="white" />
}
export default CustomHeaderButton