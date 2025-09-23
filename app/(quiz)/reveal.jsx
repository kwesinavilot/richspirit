import { useState, useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Share, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateSpiritAnimal } from '../../data/questionPool';

export default function Reveal() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const backgroundImage = require('../../assets/images/forrest.jpg');

    useEffect(() => {
        const calculateResult = async () => {
            try {
                const questionsData = await AsyncStorage.getItem('@richspirit_quiz_questions');
                const answersData = await AsyncStorage.getItem('@richspirit_quiz_answers');
                
                if (questionsData && answersData) {
                    const questions = JSON.parse(questionsData);
                    const answers = JSON.parse(answersData);
                    const calculatedResult = calculateSpiritAnimal(questions, answers);
                    setResult(calculatedResult);
                }
            } catch (error) {
                console.log('Error calculating result:', error);
            } finally {
                setLoading(false);
            }
        };
        
        calculateResult();
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleShare = async () => {
        if (!result) return;
        
        try {
            await Share.share({
                message: `I just discovered my spirit animal: ${result.animal.name}! ${result.animal.description} ${result.animal.emoji}✨ Find yours with the Rich Spirit app!`,
                title: 'My Spirit Animal'
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const handleContinue = async () => {
        // Mark quiz as completed
        await AsyncStorage.setItem('@richspirit_taken_quiz', 'true');
        router.replace('/(actualize)');
    };

    if (loading || !result) {
        return (
            <ImageBackground source={backgroundImage} resizeMode="cover" className="flex-1">
                <View className="flex-1 bg-black/40">
                    <SafeAreaView className="flex-1 justify-center items-center">
                        <Text className="text-white text-lg JakartaMedium">Calculating your spirit animal...</Text>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground 
            source={backgroundImage} 
            resizeMode="cover" 
            className="flex-1"
        >
            <View className="flex-1 bg-black/40">
                <SafeAreaView className="flex-1 px-6">
                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        <Text className="text-2xl JakartaBold text-white text-center mb-8 mt-4">
                            Your Spirit Animal Awaits
                        </Text>

                        {/* Postcard */}
                        <TouchableOpacity 
                            className="w-full h-96 mb-6"
                            onPress={handleFlip}
                        >
                            <View className="flex-1 bg-white rounded-3xl p-6 shadow-lg">
                                {!isFlipped ? (
                                    // Front of postcard
                                    <View className="flex-1 justify-center items-center">
                                        <Text className="text-6xl mb-4">{result.animal.emoji}</Text>
                                        <Text className="text-2xl JakartaBold text-gray-800 text-center">
                                            {result.animal.name}
                                        </Text>
                                        <Text className="text-lg JakartaMedium text-gray-600 text-center mt-2">
                                            {result.animal.description}
                                        </Text>
                                        <Text className="text-sm JakartaRegular text-gray-400 text-center mt-4">
                                            Tap to flip
                                        </Text>
                                    </View>
                                ) : (
                                    // Back of postcard with trait breakdown
                                    <ScrollView className="flex-1">
                                        <Text className="text-lg JakartaMedium text-gray-800 text-center mb-4">
                                            Your Wealth-Building Profile
                                        </Text>
                                        
                                        {Object.entries(result.scores).map(([trait, score]) => (
                                            <View key={trait} className="mb-2">
                                                <View className="flex-row justify-between items-center">
                                                    <Text className="text-sm JakartaMedium text-gray-700 capitalize">
                                                        {trait}
                                                    </Text>
                                                    <Text className="text-sm JakartaBold text-gray-800">
                                                        {result.animal.traits[trait]}
                                                    </Text>
                                                </View>
                                                <View className="w-full h-2 bg-gray-200 rounded-full mt-1">
                                                    <View 
                                                        className="h-full bg-yellow-600 rounded-full"
                                                        style={{ width: `${(score / 3) * 100}%` }}
                                                    />
                                                </View>
                                            </View>
                                        ))}
                                        
                                        <Text className="text-xs JakartaRegular text-gray-500 text-center mt-4">
                                            *For entertainment purposes only. Not financial advice.
                                        </Text>
                                    </ScrollView>
                                )}
                            </View>
                        </TouchableOpacity>

                        {/* Personal Message */}
                        <View className="bg-white/10 rounded-2xl p-4 mb-6">
                            <Text className="text-white text-base JakartaRegular text-center leading-6">
                                {result.animal.message}
                            </Text>
                            <Text className="text-white/70 text-sm JakartaRegular text-center mt-3">
                                - The Rich Spirit Team
                            </Text>
                        </View>

                        <View className="space-y-4 pb-6">
                            <TouchableOpacity 
                                className="bg-blue-600 px-8 py-4 rounded-full"
                                onPress={handleShare}
                            >
                                <Text className="text-white text-lg JakartaMedium text-center">
                                    Share Your Spirit Animal
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="bg-yellow-700 px-8 py-4 rounded-full"
                                onPress={handleContinue}
                            >
                                <Text className="text-white text-lg JakartaMedium text-center">
                                    Continue Your Journey →
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}