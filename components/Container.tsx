import React from 'react';
import { View, SafeAreaView } from 'react-native';


interface Props {
    children: React.ReactNode;
    className?: string;
  }

const Container = ({ children, className }: Props) => {
    return (
        <SafeAreaView>
            <View>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default Container;