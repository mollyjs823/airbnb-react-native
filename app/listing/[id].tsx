import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {string} from "prop-types";

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text>{ id }</Text>
        </View>
    );
};

export default Page;