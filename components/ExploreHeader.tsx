import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {useRef, useState} from "react";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSliders} from "@fortawesome/pro-light-svg-icons";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import {faHouseHeart} from "@fortawesome/pro-light-svg-icons";
import {faCabin} from "@fortawesome/pro-light-svg-icons";
import {faFire} from "@fortawesome/pro-light-svg-icons";
import {faGamepad} from "@fortawesome/pro-light-svg-icons";
import {faCity} from "@fortawesome/pro-light-svg-icons";
import {faWave} from "@fortawesome/pro-light-svg-icons";
import {faFlowerDaffodil} from "@fortawesome/pro-light-svg-icons";


const categories = [
    {
        name: 'Trending',
        icon: faFire,
    },
    {
        name: 'Tiny Homes',
        icon: faHouseHeart,
    },
    {
        name: 'Cabins',
        icon: faCabin,
    },
    {
        name: 'Countryside',
        icon: faFlowerDaffodil,
    },
    {
        name: 'Play',
        icon: faGamepad,
    },
    {
        name: 'City',
        icon: faCity,
    },
    {
        name: 'Beachfront',
        icon: faWave,
    },
];

interface Props {
    onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView | null>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={'/(modals)/booking'} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <FontAwesomeIcon icon={faSearch} />
                            <View>
                                <Text style={{fontFamily: 'montserrat-sb'}}>Where to?</Text>
                                <Text style={{fontFamily: 'montserrat', color: Colors.gray}}>Anywhere | Any Week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <FontAwesomeIcon icon={faSliders} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        gap: 30,
                        paddingHorizontal: 16,
                    }}
                >
                    { categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            ref={(el) => itemsRef.current[index] = el}
                            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                            onPress={() => selectCategory(index)}
                        >
                            <FontAwesomeIcon
                                icon={item.icon as any}
                                size={22}
                                color={activeIndex === index ? '#000' : Colors.gray}
                            />
                            <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 140,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 16,
    },
    filterBtn: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 24,
    },
    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: '#c2c2c2',
        borderWidth: StyleSheet.hairlineWidth,
        padding: 14,
        borderRadius: 30,
        backgroundColor: '#fff',
        flex: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        }
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'montserrat-sb',
        color: Colors.gray,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'montserrat-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        gap: 6,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
        gap: 6,
    }
});

export default ExploreHeader;