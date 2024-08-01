import {Text, View} from "react-native";
import {Link, Stack} from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import {useMemo, useState} from "react";
import listingsData from '@/assets/data/air-bnb-listings.json';
import ListingsMap from "@/components/ListingsMap";


const Page = () => {
    const [category, setCategory] = useState('Trending');

    const items = useMemo(() => listingsData as any, []);

    const onDataChanged = (category: string) => {
        setCategory(category);
    }
    return (
        <View style={{ flex: 1, marginTop: 130 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            {/*<Listings listings={items} category={category} />*/}
            <ListingsMap listings={listingsDataGeo} />
        </View>
    );
};

export default Page;