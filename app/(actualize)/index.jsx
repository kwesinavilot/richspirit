import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Actualize() {
    return (
        <SafeAreaView className="flex-1 bg-green-50">
            <View className="flex-1 justify-center items-center px-6">
                <Text className="text-3xl JakartaBold text-green-800 text-center mb-4">
                    Welcome to Your Journey
                </Text>
                <Text className="text-lg JakartaMedium text-green-700 text-center">
                    This is where we'll help you actualize your roadmap to $1M
                </Text>
            </View>
        </SafeAreaView>
    );
}