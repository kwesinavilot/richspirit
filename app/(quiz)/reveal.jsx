import { useState, useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Share, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateSpiritAnimal } from '../../data/questionPool';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Reveal() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showShareOptions, setShowShareOptions] = useState(false);
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

    const shareMessage = result ? `I just discovered my spirit animal: ${result.animal.name}! ${result.animal.description} ${result.animal.emoji}✨ Find yours with Rich Spirit app!` : '';

    const handleShareTo = async (platform) => {
        if (!result) return;
        
        const encodedMessage = encodeURIComponent(shareMessage);
        let url = '';

        switch (platform) {
            case 'tiktok':
                await Share.share({ message: shareMessage });
                break;
            case 'x':
                url = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
                break;
            case 'instagram':
                await Share.share({ message: shareMessage });
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://richspirit.app')}&summary=${encodedMessage}`;
                break;
            case 'whatsapp':
                url = `whatsapp://send?text=${encodedMessage}`;
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${encodeURIComponent('https://richspirit.app')}&text=${encodedMessage}`;
                break;
        }

        if (url) {
            try {
                await Linking.openURL(url);
            } catch (error) {
                await Share.share({ message: shareMessage });
            }
        }
        setShowShareOptions(false);
    };

    const handleContinue = async () => {
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
                    <ScrollView className="flex-1 pt-20" showsVerticalScrollIndicator={false}>
                        <Text className="text-2xl font-bold JakartaBold text-white text-center mb-8 mt-4">
                            Congratulations 🎉
                        </Text>

                        {/* Postcard */}
                        <TouchableOpacity 
                            className="w-full h-96 mb-6"
                            onPress={handleFlip}
                        >
                            <View className="flex-1 bg-white rounded-3xl shadow-lg">
                                {!isFlipped ? (
                                    // Front of postcard
                                    <View className="flex-1 justify-center p-6 items-center">
                                        <Text className="text-6xl mb-4">{result.animal.emoji}</Text>
                                        <Text className="text-2xl font-bold JakartaBold text-gray-800 text-center">
                                            {result.animal.name}
                                        </Text>
                                        <Text className="text-lg font-medium JakartaMedium text-gray-600 text-center mt-2">
                                            {result.animal.description}
                                        </Text>
                                        <Text className="text-sm font-regular JakartaRegular text-gray-400 text-center mt-4">
                                            Tap to flip
                                        </Text>
                                    </View>
                                ) : (
                                    // Back of postcard with personal message
                                    <View className="flex-1 justify-center px-4 py-3">
                                        <Text className="text-lg font-medium JakartaMedium text-gray-800 text-center mb-2">
                                            Personal Message
                                        </Text>
                                        <Text className="text-base font-regular JakartaRegular text-gray-700 text-center leading-6">
                                            {result.animal.message}
                                        </Text>
                                        <Text className="text-sm font-regular JakartaRegular text-gray-500 text-center mt-6">
                                            - The Rich Spirit Team
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>

                        {/* Share Options */}
                        {showShareOptions && (
                            <View className="bg-white/10 rounded-2xl p-4 mb-6">
                                <Text className="text-white text-lg font-medium JakartaMedium text-center mb-2">Share to:</Text>
                                <View className="flex-row flex-wrap justify-center gap-3">
                                    <TouchableOpacity 
                                        className="bg-black w-12 h-12 rounded-full justify-center items-center"
                                        onPress={() => handleShareTo('tiktok')}
                                    >
                                        <FontAwesome6 name="tiktok" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className="bg-green-500 w-12 h-12 rounded-full justify-center items-center"
                                        onPress={() => handleShareTo('whatsapp')}
                                    >
                                        <FontAwesome6 name="whatsapp" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className="bg-black w-12 h-12 rounded-full justify-center items-center"
                                        onPress={() => handleShareTo('x')}
                                    >
                                        <FontAwesome6 name="x-twitter" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className="bg-pink-500 w-12 h-12 rounded-full justify-center items-center"
                                        onPress={() => handleShareTo('instagram')}
                                    >
                                        <FontAwesome6 name="instagram" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className="bg-blue-700 w-12 h-12 rounded-full justify-center items-center"
                                        onPress={() => handleShareTo('linkedin')}
                                    >
                                        <FontAwesome6 name="linkedin" size={20} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className="bg-blue-500 w-12 h-12 rounded-full justify-center items-center"
                                        onPress={() => handleShareTo('telegram')}
                                    >
                                        <FontAwesome6 name="telegram" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        <View className="space-y-4 pb-6">
                            <TouchableOpacity 
                                className="bg-blue-600 px-8 py-4 rounded-full mb-4"
                                onPress={() => setShowShareOptions(!showShareOptions)}
                            >
                                <Text className="text-white text-lg font-medium JakartaMedium text-center">
                                    Share Your Spirit Animal
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="bg-[#fd7e14] px-8 py-4 rounded-full"
                                onPress={handleContinue}
                            >
                                <Text className="text-white text-lg font-medium JakartaMedium text-center">
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