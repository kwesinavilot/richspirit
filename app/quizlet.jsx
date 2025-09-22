import { ImageBackground, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verifyInstallation } from 'nativewind';

export default function Quizlet() {
    // Ensure to call inside a component, not globally
    verifyInstallation();
    
    const backgroundImage = require('../assets/images/forrest.jpg');

    return (
        <ImageBackground 
            style={{ 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            source={backgroundImage} 
            resizeMode="cover" 
            className="justify-center items-center"
        >
            <SafeAreaView className="justify-center items-center gap-y-5 w-full h-full px-10 bg-white">
                <Text className="text-3xl JakartaBold text-yellow-700 text-center">Rich Spirit</Text>
                <Text className="text-white text-md JakartaMedium">Discover your tribe. Unlock the spirit animal that guides you</Text>

                <TouchableHighlight className="bg-yellow-700 px-4 py-2 rounded">
                    <Text className="text-white text-md JakartaMedium">Find Your Tribe →</Text>
                </TouchableHighlight>
            </SafeAreaView>
        </ImageBackground>
    );
}