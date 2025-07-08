"use client"
import Link from "next/link";
import {  type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          // <Collapsible
          //   key={item.title}
          //   asChild
          //   defaultOpen={item.isActive}
          //   className="group/collapsible"
          // >
          //   <SidebarMenuItem>
          //     <CollapsibleTrigger asChild>
          //       <SidebarMenuButton tooltip={item.title}>
          //         {item.icon && <item.icon />}
          //         <span>{item.title}</span>
          //         <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          //       </SidebarMenuButton>
          //     </CollapsibleTrigger>
          //     <CollapsibleContent>
          //       <SidebarMenuSub>
          //         {item.items?.map((subItem) => (
          //           <SidebarMenuSubItem key={subItem.title}>
          //             <SidebarMenuSubButton asChild>
          //               {/* <a href={subItem.url}>
          //                 <span>{subItem.title}</span>
          //               </a> */}
          //               <Link href={subItem.url}>
          //                 <span>{subItem.title}</span>
          //               </Link>
          //             </SidebarMenuSubButton>
          //           </SidebarMenuSubItem>
          //         ))}
          //       </SidebarMenuSub>
          //     </CollapsibleContent>
          //   </SidebarMenuItem>
          // </Collapsible>
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <div className="flex items-center w-full">
                <Link href={item.url} className="flex-1">
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>

                {/* <CollapsibleTrigger asChild>
                  <button className="p-2">
                    <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </button>
                </CollapsibleTrigger> */}
              </div>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
