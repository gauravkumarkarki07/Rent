import { MdOutlineBedroomParent } from "react-icons/md";
import { PiToiletFill } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";

export default function PropertyCard({address,bedroom,bathroom,propertyType,price,propertyImage}) {
  return (
    <div className="flex flex-col gap-4 border rounded-md w-[250px] h-[300px] px-2 py-2">
        <img src={propertyImage} alt="Image" className="h-[60%]"/>
        <div className="flex flex-col gap-1 justify-center w-full">
            <h3 className="font-semibold text-lg">{address}</h3>
            <div className="text-lg flex gap-4 justify-start">
                <span className="flex gap-2 items-center justify-start"><MdOutlineBedroomParent/>{bedroom}</span>
                <span className="flex gap-2 items-center justify-start"><PiToiletFill/>{bathroom}</span>
                <span>|</span>
                <span className="flex gap-2 items-center justify-start"><BiBuildingHouse/>{propertyType}</span>
            </div>
            <span className="py-2 rounded-lg bg-blue-400 px-2">${price}/ week</span>
        </div>
    </div>
  )
}
