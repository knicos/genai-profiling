import { icons } from "./IconOptions";
import { IconType } from "./type";

interface Props {
    icon: IconType;
}

export default function Icon({ icon } : Props){
    const IconComponent = icons[icon];

    return <IconComponent fontSize='inherit'/>;
}