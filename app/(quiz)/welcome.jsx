import { ImageBackground, Text, TouchableOpacity } from 'react-native';
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
            <SafeAreaView className="flex-1 justify-center items-center px-10">
                <Text className="text-4xl JakartaBold text-white text-center mb-4">
                    Rich Spirit
                </Text>
                <Text className="text-white text-lg JakartaMedium text-center mb-8">
                    Discover your tribe. Unlock the spirit animal that guides you
                </Text>

                <TouchableOpacity 
                    className="bg-yellow-700 px-8 py-4 rounded-full"
                    onPress={handleFindTribe}
                >
                    <Text className="text-white text-lg JakartaMedium">
                        Find Your Tribe →
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}