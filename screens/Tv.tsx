import React, { useState } from "react";
import { ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvAPI } from "../api";
import HList, { HListSeperator } from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: todayLoading , data: todayData, isRefetching: todayRefetching } = useQuery(
    ["tv", "today"], tvAPI.airingToday
  );
  const { isLoading: topLoading, data: topData, isRefetching: topRefetching } = useQuery(
    ["tv", "top"], tvAPI.topRated
  );
  const { isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefetching } = useQuery(
    ["tv", "trending"], tvAPI.trending
  );

  const onRefresh = async () => {
    setRefreshing(true)
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  
  const loading = todayLoading || topLoading || trendingLoading;
  if(loading) {
    return <Loader />
  };
  
  return (
    <ScrollView 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 30, marginTop: 20 }}>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;