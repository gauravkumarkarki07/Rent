import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';
import useGetApi from '../services/api/useGetAPI.js';

export default function MyProperty() {
    const session = useSelector(state => state.user.session);
    const [get, responseData] = useGetApi(`/api/user/getpropertyById/${session?.session?._id}`);

    useEffect(() => {

        const getData=async()=>{
            await get();
        }

       getData();
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col ml-36 px-1 py-2 gap-2">
                <h1 className="font-semibold text-xl px-1">My Listed Property</h1>
                <div className="w-[20%]">
                    <Link to={'/addnewproperty'}>
                        <Button
                            variant="warning"
                            type="button"
                        >
                            Add New Property
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between">
                <div className="w-[80%] border flex justify-center px-2 py-2">
                    <input
                        className="border"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="w-[80%] grid grid-cols-4 py-2">
                    {responseData?.propertyDetails ? (
                        responseData.propertyDetails.map((data, index) => (
                            <PropertyCard key={index}
                                address={data.address}
                                propertyImage={data.propertyImage}
                                bedroom={data.bedroom}
                                bathroom={data.bathroom}
                                propertyType={data.propertyType}
                                price={data.price}
                            />
                        ))
                    ) : (
                        <p>No Data</p>
                    )}
                </div>
            </div>
        </div>
    );
}
