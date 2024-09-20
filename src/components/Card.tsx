import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";

const Card = ({ children, className, ...other }: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div
            className={twMerge("bg-gray-800 rounded-3xl relative overflow-hidden z-0 after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none", className)}
            {...other}
        >
            <div className="absolute inset-0 -z-10 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }
            }></div>
            {children}
        </div>
    )
}

const Header = ({ title, description, className }: { title: string, description: string, className?: string }) => (
    <div className={twMerge("flex flex-col p-6 md:py-8 md:px-10", className)}>
        <div className="inline-flex items-center gap-2">
            <StarIcon className="size-9 text-emerald-300" />
            <h3 className="font-serif text-3xl">{title}</h3>
        </div>
        <p className="text-sm lg:text-base max-w-xs text-white/60 mt-2">{description}</p>
    </div>
);

Card.Header = Header;

export default Card;