import {Text, View} from "react-native";
import {Link} from "expo-router";

const Page = () => {
    return (
        <View>
            <Text>Index</Text>
            <Link href={"/(modals)/login"}>Login</Link>
            <Link href={"/(modals)/booking"}>Book</Link>
            <Link href={"/listing/123"}>Listing details</Link>
        </View>
    );
};

export default Page;