import NewsIcon from "@heroicons/react/24/solid/NewspaperIcon";
import BeakerIcon from "@heroicons/react/24/solid/BeakerIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/solid/ChatBubbleLeftRightIcon";


interface IPerk {
  title: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const perks: IPerk[] = [
  {
    title: "News Updates",
    icon: NewsIcon
  },
  {
    title: "Easly Access",
    icon: BeakerIcon
  },
  {
    title: "Surveys",
    icon: ChatBubbleLeftRightIcon
  }
];

export default perks;