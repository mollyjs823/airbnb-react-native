import {Tabs} from "expo-router";
import Colors from "@/constants/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelope, faHeart, faSearch, faUser} from "@fortawesome/pro-regular-svg-icons";
import {faAirbnb} from "@awesome.me/kit-c55f8bd193/icons/modules/classic/brands";

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarLabelStyle: {
                fontFamily: 'montserrat-b'
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faSearch} color={color} size={size - 4} />
                }}
            />
            <Tabs.Screen
                name="wishlists"
                options={{
                    tabBarLabel: "Wishlists",
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faHeart} color={color} size={size - 4} />
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    tabBarLabel: "Trips",
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faAirbnb} color={color} size={size - 4} />
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarLabel: "Inbox",
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faEnvelope} color={color} size={size - 4} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faUser} color={color} size={size - 4} />
                }}
            />
        </Tabs>
    )
};

export default Layout;