import * as React from "react";
import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const locations = [
    "Chennai Airport",
    "Chennai Central Railway Station",
    "Chennai Koyambedu Bus stand",
    "Chennai Pallavaram",
    "Chennai Merina Beach",
    "Pondicherry White town",
    "Pondicherry Lawspet",
    "Pondicherry Ariyankuppam",
    "Pondicherry Villiyanur",
    "Pondicherry jipmer Hospital",
    "Pondicherry Saram Village",
    "Bangalore Airport",
    "Bangalore Silk Board",
    "Pondicherry Aurovile",
    "Pondicherry French colony",
    "Pondicherry Paradise Beach",
    "Pondicherry Eden Beach",
    "Rock Beach Pondicherry",
    "Sozhinganallur Chennai",
    "Cuddalore",
    "Mahabalipuram"
].sort();

interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
}

export function LocationAutocomplete({
    value,
    onChange,
    placeholder,
    className
}: LocationAutocompleteProps) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value);

    // Sync internal state with prop
    React.useEffect(() => {
        setInputValue(value);
    }, [value]);

    const filteredLocations = locations.filter((l) =>
        l.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <Popover open={open && filteredLocations.length > 0} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Input
                            required
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                onChange(e.target.value);
                                setOpen(true);
                            }}
                            onFocus={() => setOpen(true)}
                            className={cn(
                                "rounded-xl border-gray-200 h-12 bg-gray-50/50 pr-10",
                                className
                            )}
                        />
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 border-none shadow-xl rounded-xl w-[--radix-popover-trigger-width]"
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <Command className="rounded-xl border shadow-md bg-white text-gray-900">
                        <CommandList>
                            <CommandEmpty className="py-2 text-center text-sm text-gray-500">
                                No district found.
                            </CommandEmpty>
                            <CommandGroup heading="Populer Locations">
                                {filteredLocations.map((location) => (
                                    <CommandItem
                                        key={location}
                                        value={location}
                                        onSelect={(currentValue) => {
                                            setInputValue(currentValue);
                                            onChange(currentValue);
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                                    >
                                        <MapPin className="h-4 w-4 text-blue-500 opacity-70" />
                                        <span className="font-medium text-gray-700">{location}</span>
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4 text-blue-600",
                                                value.toLowerCase() === location.toLowerCase() ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
