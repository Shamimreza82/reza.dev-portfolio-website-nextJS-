import { Button } from "@/components/ui/button"
import {
  DropdownMenu as UIDropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenu() {
  return (
    <UIDropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
    </UIDropdownMenu>
  )
}
