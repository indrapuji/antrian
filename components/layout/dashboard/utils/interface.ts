/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LabelMenuProps {
  theme: string;
  content: string;
  className?: string;
}

export interface SidebarProps {
  isOpen: boolean;
  isDesktop: boolean;
  setOpen: any;
  isNama: any;
  isRole: any;
}

export interface NavbarProps {
  isOpen: boolean;
  setOpen: any;
  isNavRightMenuUser: boolean;
  setNavRightMenuUser: any;
  isName: string;
  isLogo: string;
}
