import {StyleSheet, View} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {defaultStyles} from "@/constants/Styles";

interface Props {
    listings: any;
}

const ListingsMap = ({ listings }: Props) => {
    return (
        <View style={defaultStyles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
            >
                {/*{listings.map((listing) => (*/}
                {/*    <Marker*/}
                {/*        key={listing.id}*/}
                {/*        coordinate={{*/}
                {/*            latitude: listing.latitude,*/}
                {/*            longitude: listing.longitude,*/}
                {/*        }}*/}
                {/*        title={listing.name}*/}
                {/*        description={listing.room_type}*/}
                {/*    />*/}
                {/*))}*/}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
})
export default ListingsMap;