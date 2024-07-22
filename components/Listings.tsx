import {FlatList, ListRenderItem, TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";
import {useEffect, useRef, useState} from "react";
import {defaultStyles} from "@/constants/Styles";
import {Link} from "expo-router";
import {Listing} from "@/interfaces/listing";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHeart} from "@fortawesome/pro-regular-svg-icons";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import Animated, {FadeInRight, FadeOutLeft} from "react-native-reanimated";

interface Props {
    listings: any[];
    category: string;
}

const Listings = ({ listings, category}: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    useEffect(() => {
        console.log("Reload listings", listings.length);
    }, [category]);

    const renderRow: ListRenderItem<Listing> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{uri: item.medium_url}} style={styles.image} />
                    <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
                        <FontAwesomeIcon icon={faHeart} size={24} />
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{fontFamily: 'montserrat-sb', fontSize: 16}}>
                            {item.name}
                        </Text>
                        <View style={{flexDirection: 'row', gap: 4}}>
                            <FontAwesomeIcon icon={faStar} size={16} />
                            <Text style={{fontFamily: 'montserrat-sb'}}>{item.review_scores_rating / 20}</Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'montserrat-sb'}}>{item.room_type}</Text>
                    <View style={{ flexDirection: 'row', gap: 4}}>
                        <Text style={{ fontFamily: 'montserrat-sb'}}>${item.price}</Text>
                        <Text style={{ fontFamily: 'montserrat'}}>/ night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={defaultStyles.container}>
            <FlatList
                data={loading ? [] : listings}
                ref={listRef}
                renderItem={renderRow}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    }
});
export default Listings;