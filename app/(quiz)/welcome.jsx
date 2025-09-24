import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Welcome() {
    const backgroundImage = require('../../assets/images/forrest.jpg');

    const handleFindTribe = () => {
        router.push('/(quiz)/identity');
    };

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            className="flex-1"
        >
            <View className="flex-1 bg-black/40">
                <SafeAreaView className="flex-1 justify-center align-center items-center px-10 ">
                    <View className="w-full flex-column items-center mb-2 mt-32 gap-y-1">
                        <Text className="text-4xl font-bold JakartaBold text-white text-center mb-0">
                            Discover your tribe
                        </Text>
                        <Text className="text-white text-md font-medium JakartaMedium text-center mb-8">
                            Unlock the animal spirit that guides your financial decisions
                        </Text>
                    </View>

                    <TouchableOpacity
                        className="bg-[#fd7e14] px-8 py-4 rounded-full"
                        onPress={handleFindTribe}
                    >
                        <Text className="text-white text-lg font-medium JakartaMedium">
                            Find Your Tribe →
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}