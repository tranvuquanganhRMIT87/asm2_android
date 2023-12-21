import { View, Text, FlatList } from 'react-native'
import React from 'react'
import NearByPlaceCard from '../screens/ReuseableComponent/NearByPlaceCard'
const PlaceList = ({placeList}) => {
  
  return (
    <View>
      <FlatList
        data={placeList}
        renderItem={({item,index}) => (
            <View>
                <NearByPlaceCard place={item}/>
            </View>
        )}
        horizontal={true}
        style={{height:230, marginTop: 10}}
        showsHorizontalScrollIndicator={false}
     />
    </View>
  )
}

export default PlaceList