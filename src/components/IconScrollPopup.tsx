import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heart, 
  Star, 
  Bell, 
  Settings, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Camera, 
  Music, 
  Video, 
  Image, 
  File, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Plus, 
  Minus,
  Home,
  ShoppingCart,
  Gift,
  Award,
  Crown,
  Gem,
  Palette,
  Brush,
  Scissors,
  Hammer
} from "lucide-react";

const icons = [
  { icon: Heart, name: "Heart", color: "text-red-500" },
  { icon: Star, name: "Star", color: "text-yellow-500" },
  { icon: Bell, name: "Bell", color: "text-blue-500" },
  { icon: Settings, name: "Settings", color: "text-gray-500" },
  { icon: User, name: "User", color: "text-purple-500" },
  { icon: Mail, name: "Mail", color: "text-green-500" },
  { icon: Phone, name: "Phone", color: "text-indigo-500" },
  { icon: Calendar, name: "Calendar", color: "text-orange-500" },
  { icon: Camera, name: "Camera", color: "text-pink-500" },
  { icon: Music, name: "Music", color: "text-violet-500" },
  { icon: Video, name: "Video", color: "text-cyan-500" },
  { icon: Image, name: "Image", color: "text-emerald-500" },
  { icon: File, name: "File", color: "text-slate-500" },
  { icon: Download, name: "Download", color: "text-teal-500" },
  { icon: Upload, name: "Upload", color: "text-amber-500" },
  { icon: Search, name: "Search", color: "text-lime-500" },
  { icon: Filter, name: "Filter", color: "text-rose-500" },
  { icon: Edit, name: "Edit", color: "text-sky-500" },
  { icon: Trash, name: "Trash", color: "text-red-600" },
  { icon: Plus, name: "Plus", color: "text-green-600" },
  { icon: Minus, name: "Minus", color: "text-red-400" },
  { icon: Home, name: "Home", color: "text-blue-600" },
  { icon: ShoppingCart, name: "Cart", color: "text-purple-600" },
  { icon: Gift, name: "Gift", color: "text-pink-600" },
  { icon: Award, name: "Award", color: "text-yellow-600" },
  { icon: Crown, name: "Crown", color: "text-amber-600" },
  { icon: Gem, name: "Gem", color: "text-emerald-600" },
  { icon: Palette, name: "Palette", color: "text-violet-600" },
  { icon: Brush, name: "Brush", color: "text-orange-600" },
  { icon: Scissors, name: "Scissors", color: "text-cyan-600" },
  { icon: Hammer, name: "Hammer", color: "text-stone-600" },
];

const IconScrollPopup = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-pottery-gold hover:bg-pottery-gold/90 text-pottery-bronze">
          📱 Open Icon Popup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Choose an Icon
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-96 w-full rounded-md border p-4">
          <div className="grid grid-cols-4 gap-4">
            {icons.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`
                    flex flex-col items-center p-3 rounded-lg cursor-pointer
                    hover:bg-muted transition-colors duration-200
                    ${selectedIcon === item.name ? 'bg-pottery-gold/20 ring-2 ring-pottery-gold' : ''}
                  `}
                  onClick={() => setSelectedIcon(item.name)}
                >
                  <IconComponent 
                    className={`h-8 w-8 mb-2 ${item.color} transition-transform hover:scale-110`} 
                  />
                  <span className="text-xs text-center font-medium">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        {selectedIcon && (
          <div className="mt-4 p-3 bg-muted rounded-md text-center">
            <p className="text-sm">
              Selected: <span className="font-bold text-pottery-gold">{selectedIcon}</span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IconScrollPopup;