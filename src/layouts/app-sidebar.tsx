import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  HardDriveDownload,
  type LucideProps,
  // Home,
  Palette,
  Timer,
  // Youtube,
} from "lucide-react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import faviconSm from "../../assets/icons/faviconSm.png";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2">
            <img alt="Website Logo" src={faviconSm} className="size-5" />
            <p className="text-primary text-sm">SuperEasy</p>
          </SidebarGroupLabel>
          {/* <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={"/"}>
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent> */}
        </SidebarGroup>
        <CollapsibleSidebarMenu
          title="Audio / Video Download"
          items={videoAudioDownload}
        />
        <CollapsibleSidebarMenu title="Converter" items={aviConverter} />
        <CollapsibleSidebarMenu title="Color Picker" items={colorPicker} />
      </SidebarContent>
    </Sidebar>
  );
}

function CollapsibleSidebarMenu({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: ElementType;
  }[];
}) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <p className="text-primary">{title}</p>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item?.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

type MenuItem = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const colorPicker: MenuItem[] = [
  {
    title: "Color Picker from Image",
    url: "/color-picker-from-image",
    icon: Palette,
  },
];

const videoAudioDownload: MenuItem[] = [
  // {
  //   title: "Youtube Downloader",
  //   url: "/youtube-video-download",
  //   icon: Youtube,
  // },
  {
    title: "Soon...",
    url: "#",
    icon: Timer,
  },
];

const aviConverter: MenuItem[] = [
  {
    title: "File Converter",
    url: "/file-converter",
    icon: HardDriveDownload,
  },
];
