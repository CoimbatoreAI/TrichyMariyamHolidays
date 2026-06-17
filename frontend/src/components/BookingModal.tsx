import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Phone, Calendar as CalendarIcon, Clock, User, Users, Car } from "lucide-react";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LocationAutocomplete } from "./LocationAutocomplete";

const BookingModal = () => {
    const { isOpen, closeBooking } = useBooking();
    const [tripType, setTripType] = useState("one-way");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [guestName, setGuestName] = useState("");
    const [passengers, setPassengers] = useState("");
    const [cabType, setCabType] = useState("Sedan");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message = `*TRICHY MARIYAM HOLIDAYZ BOOKING REQUEST*\n\n` +
            `*Guest Name:* ${guestName}\n` +
            `*Passengers:* ${passengers}\n` +
            `*Vehicle Type:* ${cabType}\n` +
            `*Trip Type:* ${tripType === "one-way" ? "One Way" : "Round Trip"}\n` +
            `*Pick-up:* ${pickupLocation}\n` +
            `*Drop-off:* ${dropoffLocation}\n` +
            `*Phone:* ${phoneNumber}\n` +
            `*Date:* ${pickupDate}\n` +
            `*Time:* ${pickupTime}\n\n` +
            `_Request sent from Website_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919342084745?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        closeBooking();
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeBooking}>
            <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[500px] p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="bg-white p-5 sm:p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800 text-center">Book Your Trip</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                        {/* Trip Type selection */}
                        <RadioGroup
                            defaultValue="one-way"
                            onValueChange={setTripType}
                            className="flex items-center gap-6 mb-6 justify-center bg-gray-50 p-4 rounded-2xl"
                        >
                            <div className="flex items-center space-x-2 cursor-pointer group">
                                <RadioGroupItem value="one-way" id="one-way" className="border-blue-600 text-blue-600 focus:ring-blue-600" />
                                <Label htmlFor="one-way" className="font-semibold cursor-pointer text-gray-700 group-hover:text-blue-600 transition-colors">One Way</Label>
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer group">
                                <RadioGroupItem value="round-trip" id="round-trip" className="border-blue-600 text-blue-600 focus:ring-blue-600" />
                                <Label htmlFor="round-trip" className="font-semibold cursor-pointer text-gray-700 group-hover:text-blue-600 transition-colors">Round Trip</Label>
                            </div>
                        </RadioGroup>

                        {/* Personal Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                    <User className="w-4 h-4 text-blue-500" /> Guest Name *
                                </Label>
                                <Input
                                    required
                                    placeholder="Full Name"
                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 transition-all bg-gray-50/50 text-gray-900"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                    <Phone className="w-4 h-4 text-blue-500" /> Phone Number *
                                </Label>
                                <Input
                                    required
                                    type="tel"
                                    placeholder="Mobile Number"
                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 transition-all bg-gray-50/50 text-gray-900"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                <MapPin className="w-4 h-4 text-green-500" /> Pick-up Location *
                            </Label>
                            <LocationAutocomplete
                                placeholder="Select pick-up district"
                                value={pickupLocation}
                                onChange={setPickupLocation}
                                className="focus:border-green-500 focus:ring-green-500 text-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                <MapPin className="w-4 h-4 text-red-500" /> Drop-off Location *
                            </Label>
                            <LocationAutocomplete
                                placeholder="Select drop-off district"
                                value={dropoffLocation}
                                onChange={setDropoffLocation}
                                className="focus:border-red-500 focus:ring-red-500 text-gray-900"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                    <CalendarIcon className="w-4 h-4 text-purple-500" /> Date *
                                </Label>
                                <Input
                                    required
                                    type="date"
                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 transition-all bg-gray-50/50 text-gray-900"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                    <Clock className="w-4 h-4 text-purple-500" /> Time *
                                </Label>
                                <Input
                                    required
                                    type="time"
                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 transition-all bg-gray-50/50 text-gray-900"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Passengers & Vehicle Type */}
                        <div className="grid grid-cols-2 gap-4 pb-2">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                    <Users className="w-4 h-4 text-orange-500" /> Passengers *
                                </Label>
                                <Input
                                    required
                                    type="number"
                                    min="1"
                                    placeholder="No."
                                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 transition-all bg-gray-50/50 text-gray-900"
                                    value={passengers}
                                    onChange={(e) => setPassengers(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600 ml-1">
                                    <Car className="w-4 h-4 text-orange-500" /> Vehicle Type *
                                </Label>
                                <Select value={cabType} onValueChange={setCabType}>
                                    <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 transition-all bg-gray-50/50 text-gray-900">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-gray-200 text-gray-900">
                                        <SelectItem value="Sedan">Sedan (4 Seater)</SelectItem>
                                        <SelectItem value="SUV">SUV (7 Seater)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-blue-200 transition-all hover:scale-[1.01] active:scale-95 mt-4">
                            Book with WhatsApp
                        </Button>

                        <div className="pt-2 text-center">
                            <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">
                                Instant Confirmation • 24/7 Service • Verified Drivers
                            </p>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
