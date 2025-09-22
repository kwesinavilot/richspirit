import { Stack } from 'expo-router';

export default function QuizLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="identity" />
            <Stack.Screen name="questions" />
            <Stack.Screen name="reveal" />
        </Stack>
    );
}