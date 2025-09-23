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
                    <View className="w-full flex-column items-center mb-16 mt-32 gap-y-1">
                        <Text className="text-5xl font-bold JakartaBold text-white text-center mb-0">
                            Rich Spirit
                        </Text>
                        <Text className="text-white text-md font-medium JakartaMedium text-center mb-8">
                            Discover your tribe. Unlock the spirit animal that guides you
                        </Text>
                    </View>

                    <TouchableOpacity
                        className="bg-yellow-700 px-8 py-4 rounded-full"
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