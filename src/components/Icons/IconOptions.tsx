import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AppsIcon from "@mui/icons-material/Apps";
import AttractionsIcon from "@mui/icons-material/Attractions";
import BrushIcon from "@mui/icons-material/Brush";
import BuildIcon from "@mui/icons-material/Build";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BusinessIcon from "@mui/icons-material/Business";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CommuteIcon from "@mui/icons-material/Commute";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import EngineeringIcon from "@mui/icons-material/Engineering";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Groups2Icon from "@mui/icons-material/Groups2";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HeadsetIcon from "@mui/icons-material/Headset";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconType } from "./type";
import { SvgIconProps } from "@mui/material";

export const icons: Record<IconType, React.ComponentType<SvgIconProps>> = {
    work: AccountBalanceIcon,
    company: BusinessIcon,
    office: BusinessCenterIcon,
    freetime: AttractionsIcon,
    art: BrushIcon,
    tools: BuildIcon,
    birthday: CakeIcon,
    calendar: CalendarMonthIcon,
    camera: CameraAltIcon,
    color: ColorLensIcon,
    commute: CommuteIcon,
    happiness: SentimentVerySatisfiedIcon,
    family: Groups2Icon,
    engineering: EngineeringIcon,
    travel: FlightTakeoffIcon,
    food: FastfoodIcon,
    love: FavoriteBorderIcon,
    heartbreak: HeartBrokenIcon,
    music: HeadsetIcon,
    partnership: HandshakeIcon,
    home: HomeIcon,
    default: ImageIcon,
    nature: LocalFloristIcon,
    location: LocationOnIcon,
    pets: PetsIcon,
    recommendation: ThumbUpIcon,
    education: SchoolIcon,
    science: ScienceIcon,
    neutral: SentimentNeutralIcon,
    shopping: ShoppingCartIcon,
    gaming: SportsEsportsIcon,
    favorites: StarBorderIcon,
    sports: SportsSoccerIcon,
    dislike: ThumbDownAltIcon,
    languages: TranslateIcon,
    general: AppsIcon,
};