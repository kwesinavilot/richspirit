import { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Identity() {
    const [handle, setHandle] = useState('');
    const backgroundImage = require('../../assets/images/forrest.jpg');

    const handleNext = () => {
        if (handle.trim()) {
            router.push('/(quiz)/questions');
        }
    };

    return (
        <ImageBackground 
            source={backgroundImage} 
            resizeMode="cover" 
            className="flex-1"
        >
            <View className="flex-1 bg-black/40">
                <SafeAreaView className="flex-1 justify-center items-center px-10">
                    <Text className="text-3xl font-bold JakartaBold text-white text-center mb-8">
                        Let's get personal
                    </Text>
                    
                    <View className="w-full mb-8">
                        <Text className="text-white text-lg JakartaMedium mb-4 text-center">
                            Enter your X (Twitter) handle
                        </Text>
                        
                        <View className="bg-white/20 rounded-full px-6 py-1 flex-row items-center">
                            <Text className="text-white text-lg JakartaMedium mr-2">@</Text>
                            <TextInput
                                className="flex-1 text-white text-lg font-medium JakartaMedium"
                                placeholder="yourhandle"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={handle}
                                onChangeText={setHandle}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        className={`px-8 py-4 rounded-full ${handle.trim() ? 'bg-[#fd7e14]' : 'bg-gray-500'}`}
                        onPress={handleNext}
                        disabled={!handle.trim()}
                    >
                        <Text className="text-white text-lg JakartaMedium">
                            Next →
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}