import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <View className="flex justify-center bg-transparent gap-y-5 pb-10">
                <Text className="text-3xl JakartaBold text-yellow-700">Index</Text>
            </View>
        </SafeAreaView>
    );
}