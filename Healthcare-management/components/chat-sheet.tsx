import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Chat from "./chat";
import { Button } from "./ui/button";
import "./ChatbotComponent";
import ChatbotComponent from './ChatbotComponent';

export default function ChatSheet() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <h1 className="border px-2 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-500  delay-150 ease-in-out ">
            AI Doctor
          </h1>
        </SheetTrigger>
        <SheetContent side="bottom">
          <div >
              <SheetHeader>
                <SheetTitle>AI Doctor</SheetTitle>
                <SheetDescription>
                  AI Doctor to resolve your minor confusions and queries.
                </SheetDescription>
              </SheetHeader>
              {/* <Chat/>{" "} */}
              <ChatbotComponent/>
                        <SheetFooter>
                <SheetClose asChild>
                  <Button>Close</Button>
                </SheetClose>
              </SheetFooter>
          </div>
          
        </SheetContent>
      </Sheet>
    </div>
  );
}
