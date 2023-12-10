import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, FlatList, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Home = ({navigation}) => {

    const [searchtxt, setSearchtxt] = useState('')
    const [debouncedTxt, setDebouncedTxt] = useState(searchtxt);
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    const [pageNo,setPageNo] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = 'live_ThcSAiAxVGbssLKxXGFqsIRXxmI3i1x3Ga2sVeLo6rrMrNglWkHzXKHgj1i7UiaJ'

    useEffect(() => {
         callApi();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setSearchtxt(debouncedTxt), 500);
        return () => {
            clearTimeout(timer);
        }
    }, [debouncedTxt])

    useEffect(() => {
        if (searchtxt?.length > 0) {
            const newData = data.filter(item => item.breeds?.[0]?.name.toLowerCase().startsWith(searchtxt.toLowerCase()));
            setSearchData(newData)
        } else {
            setData(data)
            setSearchData();
        }
    }, [searchtxt]);

    const callApi = () => {
        setIsLoading(true)
        const url = `https://api.thedogapi.com/v1/images/search?limit=15&has_breeds=1&page=${pageNo}`;
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey
            },
          };
        fetch(url,options).then((res) => res.json()).then((res) => {setData([...data,...res]);setIsLoading(false)}).catch((e) => {Alert.alert('Something went wrong', 'Could not fetch data, please try again!');setIsLoading(false)});
    }

    const loadNext = () => {
        if(searchtxt?.length==0){
            setPageNo(pageNo+1);
            callApi();
        }
    }

    const onSearch = (txt) => {
        setDebouncedTxt(txt)
    }

    const renderList = ({ item }) => {
            return (
                <TouchableOpacity style={styles.card} onPress={()=>(navigation.push('Details',{item}))}>
                    <Image source={{uri:item.url}} height={100} width={100} style={{borderRadius:5}}/>
                    <Text style={{color:'#000',fontSize:16}}>Breed Name : {item.breeds?.[0]?.name}</Text>
                    <Text style={{color:'#000',fontSize:15}}>Breed type : {item.breeds?.[0].temperament}</Text>
                </TouchableOpacity>
            )
    }

    return (
        <View style={styles.conatainer}>
            <View style={{ height: hp(8), borderWidth: 1, borderColor: '#000', width: wp(93), borderRadius: 7, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, flexDirection: 'row', marginBottom:10 }}>
                <TextInput style={{ color: '#000', flex: 1 }} onChangeText={onSearch}
                    value={debouncedTxt}
                    placeholder="Search by name ex 'husky'" />
                <Image source={require('../assets/search.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
            </View>
            {isLoading && data.length==0 && <ActivityIndicator size={"large"} color={'blue'}/>}
            <FlatList
                data={searchtxt?.length > 0 ? searchData : data}
                keyExtractor={(item) => item.id}
                renderItem={renderList}
                contentContainerStyle={{
                    alignItems: 'center', marginTop: 5, paddingBottom: 60
                }}
                onEndReachedThreshold={0.7}
                onEndReached={()=>loadNext()}
                onRefresh={()=>{setPageNo(0);setData([]);callApi()}}
                refreshing={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    conatainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    card: {
        width: wp(93), 
        backgroundColor:'#fff', 
        elevation:5, 
        padding:10, 
        borderRadius:5, 
        marginBottom:10, 
        marginHorizontal:5
    }

})

export default Home;