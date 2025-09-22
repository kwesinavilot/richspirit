import { useState, useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectQuestions } from '../../data/questionPool';

export default function Questions() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const backgroundImage = require('../../assets/images/forrest.jpg');

    useEffect(() => {
        const selectedQuestions = selectQuestions();
        setQuestions(selectedQuestions);
    }, []);

    const handleAnswer = async (answerIndex) => {
        const newAnswers = [...answers, answerIndex];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Store quiz data and navigate to results
            await AsyncStorage.setItem('@richspirit_quiz_questions', JSON.stringify(questions));
            await AsyncStorage.setItem('@richspirit_quiz_answers', JSON.stringify(newAnswers));
            router.push('/(quiz)/reveal');
        }
    };

    const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    if (questions.length === 0) {
        return (
            <ImageBackground source={backgroundImage} resizeMode="cover" className="flex-1">
                <SafeAreaView className="flex-1 justify-center items-center">
                    <Text className="text-white text-lg JakartaMedium">Loading questions...</Text>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground 
            source={backgroundImage} 
            resizeMode="cover" 
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">
                {/* Progress indicator */}
                <View className="w-full h-2 bg-white/20 rounded-full mt-4 mb-8">
                    <View 
                        className="h-full bg-yellow-700 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </View>

                <View className="flex-1 justify-center">
                    <Text className="text-2xl JakartaBold text-white text-center mb-8">
                        {questions[currentQuestion].text}
                    </Text>

                    <View className="space-y-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-white/20 p-4 rounded-2xl"
                                onPress={() => handleAnswer(index)}
                            >
                                <Text className="text-white text-lg JakartaMedium text-center">
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Text className="text-white/70 text-center mb-4 JakartaRegular">
                    Question {currentQuestion + 1} of {questions.length}
                </Text>
            </SafeAreaView>
        </ImageBackground>
    );
}