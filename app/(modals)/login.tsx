import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useWarmUpBrowser} from "@/hooks/useWarmUpBrowser";
import {StyleSheet} from "react-native";
import {defaultStyles} from "@/constants/Styles";
import Colors from "@/constants/Colors";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPhone} from "@fortawesome/pro-solid-svg-icons";
import {faApple} from "@fortawesome/free-brands-svg-icons";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {useOAuth} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'});
    const { startOAuthFlow: appleAuth } = useOAuth({strategy: 'oauth_apple'});
    const { startOAuthFlow: facebookAuth } = useOAuth({strategy: 'oauth_facebook'});

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            if (createdSessionId) {
                setActive!({session: createdSessionId});
                router.back();
            }
        } catch (err) {
            console.error("OAuth Error: ", err);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput autoCapitalize="none" placeholder="Email" style={[defaultStyles.inputField, {marginBottom: 30}]} />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.separatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
                <Text style={styles.separator}>or</Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
            </View>

            <View style={{gap: 20}}>
                <TouchableOpacity style={styles.btnOutline}>
                    <FontAwesomeIcon icon={faPhone} size={24} />
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <FontAwesomeIcon icon={faApple} size={24} />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <FontAwesomeIcon icon={faGoogle} size={24} />
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <FontAwesomeIcon icon={faFacebook} size={24} />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    separator: {
        fontFamily: 'montserrat-sb',
        color: Colors.gray
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontFamily: 'montserrat-sb',
        fontSize: 16,
    },
})

export default Page;